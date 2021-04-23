import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Menu, IMenuProps } from '../components/Menu/menu';
import { MenuItem, IMenuItemProps } from '../components/Menu/menuItem';
import { SubMenu, ISubMenuProps } from '../components/Menu/subMenu';

export default {
  title: 'Example/Menu',
  component: Menu,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<IMenuProps> = (args) => 
  <Menu {...args}>
    <MenuItem>首页</MenuItem>
    <MenuItem>产品</MenuItem>
    <SubMenu title="下拉菜单">
      <MenuItem>下拉菜单001</MenuItem>
      <MenuItem>下拉菜单002</MenuItem>
    </SubMenu>
    <MenuItem disabled>其他</MenuItem>
  </Menu>;

export const DefaultMenu = Template.bind({});
DefaultMenu.args = {
  defaultIndex: '1',
  mode: 'horizental',
  onSelect: (index) => {alert(index)}
};
export const VertialMenu = Template.bind({});
VertialMenu.args = {
  defaultIndex: '2',
  defaultOpenIndex: ['2'],
  mode: 'vertical'
};
