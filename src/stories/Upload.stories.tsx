import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { actions } from '@storybook/addon-actions'

import { Upload, UploadProps } from '../components/Upload/upload';
import { Button } from '../components/Button/button';

export default {
  title: 'Example/Upload',
  component: Upload,
} as Meta;

const Template1: Story<UploadProps> = (args) => <Upload {...args} ><Button btnType="primary">文件上传</Button></Upload>;
const Template2: Story<UploadProps> = (args) => <Upload {...args} ></Upload>;

export const UploadButton = Template1.bind({
    actions: {}
});
export const UploadDrag = Template2.bind({});

UploadButton.args = {
    action: 'https://jsonplaceholder.typicode.com/posts',
    onSuccess: (data) =>{console.log(data)},
    onProgress: (percentage) =>{console.log(percentage)},
    onError: (error) =>{console.log(error)},
    beforeUpload: (file: File) => {
        if(Math.round(file.size/2014) > 10) {
            alert('file too large')
            return false
        }
        return true
    }
};

UploadDrag.args = {
    action: 'https://jsonplaceholder.typicode.com/posts',
    isDrag: true,
    onSuccess: (data) =>{console.log(data)},
    onProgress: (percentage) =>{console.log(percentage)},
    onError: (error) =>{console.log(error)},
    beforeUpload: (file: File) => {
        if(Math.round(file.size/2014) > 10) {
            alert('file too large')
            return false
        }
        return true
    }
};
