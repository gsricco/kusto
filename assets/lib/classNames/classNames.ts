import {ReactNode} from 'react';

type Mods = Record<string, string | boolean | undefined | ReactNode>

export default function classNames(cls: string, mods: Mods = {}, additional: Array<string | undefined> = []): string {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([cls, value]) => Boolean(value))
      .map(([cls]) => cls),
  ].join(' ');
}
