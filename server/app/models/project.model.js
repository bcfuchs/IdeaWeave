'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose-q')(),
    Schema = mongoose.Schema;

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
    createDate: {
        type: Date,
        default: Date.now
    },
    accessUrl : {
        type : String,
        required : true
    },
    title: {
        type: String,
        default: '',
        required: 'Title cannot be blank'
    },
    brief: {
        type: String,
        default: ''
    },
    home : {
        type:String,
        default :''
    },
    webPage : {
        type : String
    },
    owner: {
        type: Schema.ObjectId,
        ref: 'User',
        required : 'a challenge must have an owner'
    },
    localisation : {},
    poster : String,
    banner : String,
    tags : [{
        type : Schema.ObjectId,
        ref :'Tag',
        unique : true
    }],
    container : {
        type: Schema.ObjectId,
        ref: 'Challenge'
    },
    followers : [{
        type : Schema.ObjectId,
        ref : 'User',
        unique : true
    }],
    members : [{
        type : Schema.ObjectId,
        ref : 'User',
        unique : true
    }],
    trello : {
        type : String
    },
    noteNumber : {
        type : Number,
        default : 0
    }
});

mongoose.model('Project', ProjectSchema);