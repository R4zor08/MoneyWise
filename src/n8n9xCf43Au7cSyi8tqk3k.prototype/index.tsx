import React from 'react'

import Home from '../oLiYptFkVsteqWdANaN7ng.frame'

/** The size every frame draws at, unless one exports its own. */
export const viewport = 'web'

export const args = {
  author: 'Mac Devey Francisco',
}

export const argTypes = {
  author: { control: 'text' },
}

type Props = Partial<typeof args> & { start?: string }

/** MoneyWise is one long page: the menu scrolls to each chapter. */
export default function Prototype(props: Props) {
  const { author } = { ...args, ...props }
  return <Home author={author} />
}
