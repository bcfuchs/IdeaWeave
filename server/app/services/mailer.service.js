emailer = require("nodemailer");
fs      = require("fs");
_       = require("lodash");

var Emailer = function Emailer(options, data) {
    this.options = options;
    this.data = data;
}

Emailer.prototype.attachments = [
    {
        fileName: "logo.png",
        filePath: "./public/images/email/logo.png",
        cid: "logo@myapp"
    }
];

Emailer.prototype.send = function(callback) {
    var attachments, html, messageData, transport;

    html = this.getHtml(this.options.template, this.data);
    attachments = this.getAttachments(html);
    messageData = {
        to: "'" + this.options.pseudo + "' <" + this.options.email + ">",
        from: "'Ideaweaves'",
        subject: this.options.subject,
        html: html,
        generateTextFromHTML: true,
        attachments: attachments
    };
    transport = this.getTransport();
    return transport.sendMail(messageData, callback);
};

Emailer.prototype.getTransport = function() {
    return emailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: "ideaWeaves@gmail.com",
            pass: "azerty1001"
        }
    });
};

Emailer.prototype.getHtml = function(templateName, data) {
    var encoding, templateContent, templatePath;
    templatePath = "./views/email/" + templateName + ".html";
    templateContent = fs.readFileSync(templatePath, encoding = "utf8");
    return _.template(templateContent, data, {
        interpolate: /\{\{(.+?)\}\}/g
    });
};

Emailer.prototype.getAttachments = function(html) {
    var attachment, attachments, _i, _len, _ref;
    attachments = [];
    _ref = this.attachments;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attachment = _ref[_i];
        if (html.search("cid:" + attachment.cid) > -1) {
            attachments.push(attachment);
        }
    }
    return attachments;
};

module.exports = Emailer;
