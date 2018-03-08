import { expect } from 'chai';

import { ServiceManager } from '../classes';
import { PostHook } from '../interfaces';
import { createEmptyPostContext } from '../testing';
import { combinePostHooks } from './combine-post-hooks';

describe('combinePostHooks', () => {

  it('should return a post-hook that executes the given sync or async post-hooks in the right order.', async () => {
    const hook1 = ctx => {
      ctx.state.foo += 'a';
    };
    const hook2 = async ctx => {
      ctx.state.foo += 'b';
    };
    const hook3 = ctx => {
      ctx.state.foo += 'c';
    };
    const hook4 = async ctx => {
      ctx.state.foo += 'd';
    };

    const postHook: PostHook = combinePostHooks([ hook1, hook2, hook3, hook4 ]);

    const ctx = createEmptyPostContext();
    ctx.state.foo = '';

    await postHook(ctx, new ServiceManager());

    expect(ctx.state.foo).to.equal('abcd');
  });

});