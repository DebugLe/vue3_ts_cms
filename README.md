//根据账号密码获取用户基本信息(id,token)，再根据 id 获取用户详细信息(角色),根据用户角色获取用户菜单，按需展示

//登录的逻辑，输入框自动校验输入的内容符不符合规范->点击登录按钮再次进行校验->发请求获取 token->根据 token/id 获取详细信息/菜单->将 token/菜单存储到本地 localStorage->展示菜单->添加动态路由->跳到内部页面&&判断是否记住密码->将判断结果和账号密码存储到本地 localStorage->解决页面刷新路由消失问题(@/stores/modules/login.ts, loadlocalStorageAction() )

//给页面添加动态路由的方法写在 utils/matchRoute.ts，在 login.ts 仓库调用,动态路由需要将 router 文件夹和 views 文件夹内的文件逐个对应写&&router.ts 文件内作为主路由的路由需要预留空的 children: []

//解决页面刷新动态路由消失的方法在 login.ts 仓库中，在 main.ts 调用

一些问题:
登录后退出再登录侧边栏菜单拿不到数据，并且很大几率登录跳转之前动态路由还没添加，导致跳转的页面不存在，原因是因为仓库中 state 存储的数据是从 localStorage 获取的，退出登录会清除 localStorage 中的菜单导致重新登录获取不到菜单，并且因为延迟问题，跳转到主页时菜单的数据还没拿到导致跳转的页面不存在，后来在请求到菜单数据在 localStorage 存储菜单数据的同时在 state 中也存储解决了问题

登陆后刷新页面动态路由消失，页面不可展示，在 pinia 写了一个函数，当 token，用户信息，用户菜单，三者都存在的时候，再次调用 router.addRoute 方法添加动态路由，考虑到 main.ts 会在刷新页面时重新加载，所以把函数放在了 main.ts 中调用，并且在 pinia 注册使用后，router 注册使用前添加。此时又有一个问题，在 pinia 的仓库中不能直接从 vue-router 引入注册使用 useRouter，这样导致页面崩溃无法使用，后来从创建 router 的文件引入 router 使用 addRoute 方法解决
