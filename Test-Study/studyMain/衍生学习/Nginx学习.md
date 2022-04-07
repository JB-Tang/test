# Ngin学习
## 基础概念
1. 基本介绍
  * Nginx是一个 轻量级、高性能的HTTP 和 反向代理服务器 ，同时也是一个 通用代理服务器
  * 特点：
    * 占用内存少
    * 并发能力强：支持高达50000个并发连接数
  * 个人理解：一个位于服务端（例如tomcat构成的服务器）与客户端之间的服务器，用于将客户端的请求处理之后给服务端，在客户端看来，Nginx和服务端属于一体的。
2. 正向代理与反向代理
  * 正向代理
    * 局域网中的电脑想要直接访问外网是不可行的，只能通过代理服务器来访问，这种代理服务就被称为正向代理，客户端与代理服务器是一个整体，代理服务器和目标服务器是分开的
  * 反向代理
    * 客户端直接访问反向代理服务器，由反向代理服务器去选择目标服务器，此时反向代理服务器和目标服务器在外界看来是一个服务器，暴露的是代理服务器的地址，隐藏了真实服务器IP地址
3. 负载均衡
  * 引入原因
    * 原始做法：客户端请求服务端，服务端去数据库查询数据，将返回的数据带给客户端。
    * 当遇到大量访问时，这种情况显然无法满足需求，我们需要添加服务端的量，但是，对于客户端而言，访问的地址时固定的。
    * 因此，我们需要一个管理者来管理这些服务端，客户端直接找管理者，再由管理者分配任务给服务端，这个管理者就是反向代理服务器，这个过程就叫负载均衡
  * 作用：
    * 通常将工作负载分布到多个服务器来提高网站，应用，数据库或其他服务的性能和可靠性
4. 动静分离
  * 引入原因
    * 传统的请求方法：当客户端请求资源时，静态资源（html,css等）和动态资源（会改变的，变量）都在一台服务器上，大大的加重了服务端的工作
    * 引入反向代理服务器后，将静态资源和动态资源放在不同的服务器上，通过反向代理服务器来指定请求去哪个服务器，这个过程就是动静分离
  * 作用
    * 加快了解析的速度，减轻了单个服务器的压力
## 配置模块
1. 全局块
  * 主要设置一些影响Nginx服务器整体运行的配置指定
  * 例如：
    * worker_processes 1;   worker_processes值越大，可以支持的并发处理量就越多
2. events块 
  * 主要影响Nginx服务器与用户的网络连接
  * 例如：
    * worker_connections 1024;  支持的最大连接数
3. http块
  * 包括http全局块和server块，是服务器配置中最频繁的部分，包括配置代理、缓存、日志定义等绝大部分功能
  * 关键块
    * server块
      * 配置虚拟主机的相关参数
    * location块
      * 配置请求路由，以及各种页面的处理情况
  * 相关配置文件代码
    ```
      ########### 每个指令必须有分号结束。#################
      #user administrator administrators;  #配置用户或者组，默认为nobody nobody。
      #worker_processes 2;  #允许生成的进程数，默认为1
      #pid /nginx/pid/nginx.pid;   #指定nginx进程运行文件存放地址
      error_log log/error.log debug;  #制定日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
      events {
          accept_mutex on;   #设置网路连接序列化，防止惊群现象发生，默认为on
          multi_accept on;  #设置一个进程是否同时接受多个网络连接，默认为off
          #use epoll;      #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
          worker_connections  1024;    #最大连接数，默认为512
      }
      http {
          include       mime.types;   #文件扩展名与文件类型映射表
          default_type  application/octet-stream; #默认文件类型，默认为text/plain
          #access_log off; #取消服务日志    
          log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for'; #自定义格式
          access_log log/access.log myFormat;  #combined为日志格式的默认值
          sendfile on;   #允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。
          sendfile_max_chunk 100k;  #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
          keepalive_timeout 65;  #连接超时时间，默认为75s，可以在http，server，location块。

          upstream mysvr {   
            server 127.0.0.1:7878;
            server 192.168.10.121:3333 backup;  #热备
          }
          error_page 404 https://www.baidu.com; #错误页
          server {
              keepalive_requests 120; #单连接请求上限次数。
              listen       4545;   #监听端口
              server_name  127.0.0.1;   #监听地址       
              location  ~*^.+$ {       #请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写。
                #root path;  #根目录
                #index vv.txt;  #设置默认页
                proxy_pass  http://mysvr;  #请求转向mysvr 定义的服务器列表
                deny 127.0.0.1;  #拒绝的ip
                allow 172.18.5.54; #允许的ip           
              } 
          }
      }   
    ```
## 配置实例(具体使用具体填写)
1. 正向代理
2. 反向代理
3. 负载均衡
4. Nginx缓存
5. 动静分离
6. 高可用
## 参考网址
1. 理解反向代理
  * https://juejin.cn/post/7082655545491980301
  * https://blog.csdn.net/lishaojun0115/article/details/53200629/
2. 具体配置详解以及代码使用
  * https://www.cnblogs.com/knowledgesea/p/5175711.html
  * https://juejin.cn/post/6844904046789132301
3. 高级
  * https://juejin.cn/post/7072616582110773262

