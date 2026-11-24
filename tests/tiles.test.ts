import { expect, test } from 'vitest';
import { LESSONS } from '../src/data/course';
import { buildLessonSession } from '../src/lib/generator';

test('only proper nouns are capitalised in tiles', () => {
  const caps = new Set<string>();
  for (const l of LESSONS)
    for (const e of buildLessonSession(l.lesson.id, 1, { listening: true, speaking: false }))
      if (e.type === 'tiles') e.tiles.forEach((t) => t[0] !== t[0].toLowerCase() && caps.add(t));
  const allowed = /^(Ana|Marko|Milica|Luka|Beograd\w*|Srbij\w*|Holandij\w*|Amsterdam\w*|Nederland\w*|Servi.*|Belgrado|Holanđan\w*|Srpkinja|Srbin|Niš\w*|Nis|Engels|Nederlands|Hollands|Dunav|Donau|T-shirt|Ik)$/;
  expect([...caps].filter((c) => !allowed.test(c))).toEqual([]);
});
