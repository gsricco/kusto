import React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import {TabBar} from './TabBar'

const meta = {
  title: 'TabBar',
  component: TabBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const adminBaseUrl = '/admin/user'
const adminUserTabData = [
  {
    name: 'Uploaded photos',
    ref: '',
  },
  {
    name: 'Payments',
    ref: 'payments',
  },
  {
    name: 'Followers',
    ref: 'followers',
  },
  {
    name: 'Following',
    ref: 'following',
  },
]

const settingsBaseUrl = '/profile/settings'
const settingsTabData = [
    {
      name: 'general_info',
      ref: '',
    },
    {
      name: 'devices',
      ref: 'devices',
    },
    {
      name: 'acc_management',
      ref: 'acc_management',
    },
    {
      name: 'my_payments',
      ref: 'payments',
    },
  ]

export const AdminUserPage: Story = {
  args: {
    baseUrl: adminBaseUrl,
    titleList: adminUserTabData,
  },
};

export const UserSettingsPage: Story = {
  args: {
    baseUrl: settingsBaseUrl,
    titleList: settingsTabData,
  },
}