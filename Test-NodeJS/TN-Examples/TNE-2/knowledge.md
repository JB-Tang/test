1、Process
    通过process对象感知控制NodeJS自身流程的方方面面
    Process不是内置模块，而是一个全局对象，可以在任何地方直接使用
2、Child Process
    使用child_process模块可以创建和控制子流程
    最核心的是.spawn
3、Cluster
    cluster模块是对child_process模块的进一步封装
    专用于解决单流程NodeJS Web服务器无法充分利用多核CPU的问题
    简化多流程服务器程序的开发，让每个核上运行一个工作流程，并统一通过主流程监听端口和分发请求
4、应用
    获取命令行参数
    退出程序
    控制输入输出
    降权
    创建子流程
    流程间通讯
    守护子流程
