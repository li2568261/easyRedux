## why

在使用redux的过程中遇到诸如:
* 模块化数据更新操作产生的，reducer书写繁琐，产生没必要的运行开销。
* 异步数据流管理
* 动态的模块数据诸如与销毁(todo)
的问题

## how


```typescript
  import easyRedux from "easyRedux";
  // base struct
  const module = {
      // 模块state
      state: {
          a: 1,
          b: "a",
          c: "c"
      },

      reducer: {
          // 同步更新当前模块state
          MCReducer: (state, payload) => {
              return payload
          }
      },
      // 异步操作
      effects: {
          mockA: async (payload, state, dispatch, store) => {
              return Promise.resolve(payload).then((payload)=>{
                  console.log("payload", payload);
                  // 直接设置根模块的state变量a
                  dispatch.a(payload)
              });
          },
          mockB: async (payload, state, dispatch, store) => {
              // 根据路径修改子模块，b变量。
              return Promise.resolve(8).then(dispatch.ModuleA.b);
          },
          mockB: async function(payload, state, dispatch, store) {
              // this用于更新当前模块的b变量
              return Promise.resolve(payload).then(this.b)
          }
      },
      modules: {
          ModuleA,
          ModuleB
      }
  }
  const { store, inject, destory} = easyRedux(module)
  store.dispatch({
    type: "module/subModule/[stateName|reducer|effects]",
    payload
  })
  store.dispatch.module.(...subModule).[stateName|reducer|effects]
  // 模块注入
  inject(modulepath, module)
  // 模块销毁
  destory(modulepath)

  // 当在业务场景需要了解异步的effect是否执行完毕我们可以
  await store.dispatch.(...submodule).effectName();
  // ... donext
```