import React from 'react';
import TextEditor from './TextEditor';
import NumberEditor from './NumberEditor';
import ColorEditor from './ColorEditor';

const map={
    'String':TextEditor,
    'Number':NumberEditor,
    'Color':ColorEditor
}

export default {

    create(attribute,value){
        var editor = map[attribute.propertyType]||TextEditor;
        return editor;
    }
}