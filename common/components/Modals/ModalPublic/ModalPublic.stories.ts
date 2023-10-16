import React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal'

const meta = {
  title: 'Modal/ModalPublic',
  component: Modal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AdminUserPage: Story = {
  args: {
    bodyText: "Are you sure you want to delete this post?"
    children: (<>
    <button>Yes</button>
    <button>No</button>
  </>)
  title: "Delete Post"
  },
};

