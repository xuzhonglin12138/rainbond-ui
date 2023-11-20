// 应用下的信息

//应用总览
const appOverview = {
  'appOverview.memory': '使用内存',
  'appOverview.cpu': '使用CPU',
  'appOverview.disk': '使用磁盘',
  'appOverview.componentNum': '组件数量',
  'appOverview.createTime': '创建时间',
  'appOverview.updateTime': '更新时间',
  'appOverview.govern': '治理模式',
  'appOverview.principal': '负责人',
  'appOverview.k8s': 'K8S资源',
  'appOverview.modelRelease': '模型发布',
  'appOverview.gateway': '网关策略',
  'appOverview.upgrade': '待升级',
  'appOverview.config': '配置组',
  'appOverview.btn.update':'更新',
  'appOverview.btn.build':'构建',
  'appOverview.btn.copy':'快速复制',
  'appOverview.btn.visit':'访问',
  'appOverview.btn.start':'启动',
  'appOverview.btn.stop':'停用',
  'appOverview.btn.change':'切换',
  'appOverview.btn.ordinary':'普通',
  'appOverview.btn.aggregation':'聚合',
  'appOverview.btn.arrange':'编辑',
  'appOverview.btn.addComponent':'添加组件',
  'appOverview.topology': '拓扑图',
  'appOverview.list': '列表',
  'appOverview.list.table.btn.name': '组件名称',
  'appOverview.list.table.memory': '内存',
  'appOverview.list.table.status': '状态',
  'appOverview.list.table.updateTime': '更新时间',
  'appOverview.list.table.operate': '操作',
  'appOverview.list.table.restart': '重启',
  'appOverview.list.table.delete': '删除',
  'appOverview.list.table.start': '启动',
  'appOverview.list.table.stop': '关闭',
  'appOverview.list.table.batchOperate': '批量操作',
  'appOverview.list.input.seach.hint': '请搜索组件',
  'appOverview.list.btn.seach': '搜索',

  'appOverview.list.BatchDelete.delete': '正在删除',
  'appOverview.list.BatchDelete.title': '确认批量删除',
  'appOverview.list.BatchDelete.name': '组件名称',
  'appOverview.list.BatchDelete.msg': '反馈信息',
  'appOverview.list.BatchDelete.operation': '操作',
  'appOverview.list.BatchDelete.Confirm': '确认删除',
  'appOverview.list.BatchDelete.down': '请先关闭组件',
  'appOverview.list.BatchDelete.deleted': '已删除',
  'appOverview.list.BatchDelete.willDeleted': '即将删除以下组件',
  'appOverview.list.BatchDelete.refresh': '请刷新数据后删除',
  'appOverview.list.BatchDelete.ConfirmDelete': '确定批量删除',

  'appOverview.no_limit': '不限制',
  'appOverview.serviceNum': '服务数量',
  'appOverview.principal.username': '账号:',
  'appOverview.principal.principal': '姓名:',
  'appOverview.principal.email': '邮箱:',
  'appOverview.versions': '版本号',
  'appOverview.shop': '商店',
  'appOverview.shopDelete':'商店已被删除',
  'appOverview.list.table.move': '移动',
  'appOverview.list.table.btn.third_party': '第三方组件',
  'appOverview.list.btn.addComponent.code.title': '从源代码开始',
  'appOverview.list.btn.addComponent.custom': '自定义仓库',
  'appOverview.list.btn.addComponent.support': '注:支持',
  'appOverview.list.btn.addComponent.standard': '等语言规范',
  'appOverview.list.btn.addComponent.image.title': '从镜像开始',
  'appOverview.list.btn.addComponent.image': '指定镜像',
  'appOverview.list.btn.addComponent.dockerRun': '指定DockerRun命令',
  'appOverview.list.btn.addComponent.market.title': '从应用市场开始',
  'appOverview.list.btn.addComponent.update.title': '从上传文件包开始',
  'appOverview.list.btn.addComponent.jwar': '软件包',
  'appOverview.list.btn.addComponent.yaml': 'Yaml',
  'appOverview.list.btn.addComponent.project': '项目',

  //helm 应用
  'appOverview.helm.title': '拓扑图',
  'appOverview.helm.componentDetail': '组件详情',
  'appOverview.helm.pages.desc.service': '当前应用未定义 Service, 无法查询实例列表',
  'appOverview.helm.pages.result.init': '初始化中...',
  'appOverview.helm.pages.result.install': '安装中...',
  'appOverview.helm.pages.result.loading': '此过程可能比较耗时，请耐心等待',
  'appOverview.helm.pages.yaml.yamlMsg': '填写配置',
  'appOverview.helm.pages.yaml.templateFile': 'Values文件',
  'appOverview.helm.pages.alert.message': '应用版本不存在、请重新选择版本',
  'appOverview.helm.pages.current_version': '当前版本',
  'appOverview.helm.pages.version': '版本',
  'appOverview.helm.pages.overrides': 'Values配置',
  'appOverview.helm.pages.over_hr': '通用配置',
  'appOverview.helm.pages.appIntroduce': '应用介绍',
  'appOverview.helm.pages.explain': '应用配置说明和使用方法概述',
  'appOverview.helm.pages.option': '配置选项',
  'appOverview.helm.pages.standard': '基于Helm规范应用配置的查看与设置',

  //删除应用资源
  'appOverview.app.delete.title': '删除应用所有资源',
  'appOverview.app.delete.table.th.service': '组件',
  'appOverview.app.delete.table.th.configGroups': '全局配置',
  'appOverview.app.delete.table.th.k8s': 'K8S资源',
  'appOverview.app.delete.table.th.domains': '网关策略',
  'appOverview.app.delete.table.th.shareRecords': '应用模版发布记录',
  'appOverview.app.delete.table.td.serviceName': '组件名称',
  'appOverview.app.delete.table.td.storageName': '当前组件挂载存储',
  'appOverview.app.delete.table.td.related': '外部应用依赖',
  'appOverview.app.delete.table.td.appConfigGroups': '应用配置组名称',
  'appOverview.app.delete.table.td.k8s': 'K8S资源名称（类型）',
  'appOverview.app.delete.table.td.domain': '网关策略名称',
  'appOverview.app.delete.table.td.shareRecords': '发布模版名称（版本）',
};

//应用发布
const appPublish = {
  'appPublish.title': '发布记录管理',
  'appPublish.desc': '应用发布是指将当前运行的应用进行模型化，形成应用模版发布到企业应用市场或云端应用商店中，从而支持应用的标准化交付或共享。',
  'appPublish.btn.local':'发布到组件库',
  'appPublish.btn.market':'发布到云应用商店',
  'appPublish.table.publishName':'发布模版名称',
  'appPublish.table.versions':'版本号(别名)',
  'appPublish.table.versions.null':'暂无版本描述',
  'appPublish.table.versions.notSpecified':'未指定',
  'appPublish.table.scope':'发布范围',
  'appPublish.table.scope.market':'应用市场',
  'appPublish.table.scope.team_market':'应用市场(团队)',
  'appPublish.table.scope.enterprise_market':'应用市场(企业)',
  'appPublish.table.scope.app_shop':'应用商店',
  'appPublish.table.publishTime':'发布时间',
  'appPublish.table.status':'状态',
  'appPublish.table.status.release':'发布中',
  'appPublish.table.status.release_finish':'发布完成',
  'appPublish.table.status.canceled':'已取消',
  'appPublish.table.operate':'操作',
  'appPublish.table.btn.delete':'删除',
  'appPublish.table.btn.confirm_delete':'确认要删除当前记录吗',
  'appPublish.table.btn.confirm':'确认',
  'appPublish.table.btn.cancel':'取消',
  'appPublish.table.btn.continue':'继续发布',
  'appPublish.table.btn.release_cancel':'取消',
  'appPublish.shop.pages.title.joinMsg':'连接信息',
  'appPublish.shop.pages.title.random':'生成随机值',
  'appPublish.shop.pages.title.environment_variable':'环境变量',
  'appPublish.shop.pages.title.environment_variable.desc':'可以使用环境变量提供业务所需参数或其他信息。',
  'appPublish.shop.pages.title.environment_variable.name':'变量名称:',
  'appPublish.shop.pages.title.flexible':'伸缩规则',
  'appPublish.shop.pages.form.label.min_node':'最小节点(个)',
  'appPublish.shop.pages.form.label.max_node':'最大节点(个)',
  'appPublish.shop.pages.form.label.step_node':'节点步长(个)',
  'appPublish.shop.pages.form.label.init_memory':'初始内存(M)',
  'appPublish.shop.pages.form.label.container_cpu':'初始CPU(m)',
  'appPublish.shop.pages.form.quota0.desc':'内存分配额0为不限制。',
  'appPublish.shop.pages.form.quota1000.desc':'CPU分配额0为不限制，1000m=1core。',
  'appPublish.shop.pages.confirm.title':'当前发布版本是Release状态，发布成功后该版本将取消Release状态',
  'appPublish.btn.record.list.title':'发布记录列表',
  'appPublish.btn.record.list.title.versions':'应用模版及发布版本设置',
  'appPublish.btn.record.list.title.appMode':'应用模版',
  'appPublish.btn.record.list.label.version':'版本号',
  'appPublish.btn.record.list.label.version_alias':'版本别名',
  'appPublish.btn.record.list.label.is_plugin':'作为插件',
  'appPublish.btn.record.list.label.describe':'版本说明',
  'appPublish.btn.record.list.label.newAppTemplate':'新建',
  'appPublish.btn.record.list.label.deitAppTemplate':'编辑',
  'appPublish.btn.record.list.title.publish_component_config':'发布组件模型配置',
  'appPublish.btn.record.list.title.publish_pluginMsg':'发布插件模型信息',
  'appPublish.btn.record.list.title.edit_publish_componentMsg':'编辑发布组件信息',
  'appPublish.btn.record.list.title.bulk_edit':'批量编辑',
  'appPublish.btn.record.list.table.plugin_alias':'插件名',
  'appPublish.btn.record.list.table.category':'分类',
  'appPublish.btn.record.list.table.build_version':'版本',
  'appPublish.btn.record.list.title.k8s':'K8S 资源',
  'appPublish.btn.record.list.table.name':'资源名称',
  'appPublish.btn.record.list.table.kind':'资源类型',
  'appPublish.btn.record.list.table.content':'文件详情',
  'appPublish.btn.record.list.table.view_details':'查看详情',
  'appPublish.btn.record.list.title.detailMsg':'详情信息',
  'appPublish.btn.record.list.title.check':'依赖检测',
  'appPublish.btn.record.list.pages.needPublish':'该组件被需要发布的',
  'appPublish.btn.record.list.pages.componentPublish':'组件依赖, 确认要取消该组件的发布吗？',
  'appPublish.btn.record.list.pages.createAppTemplate':'创建应用模版',
  'appPublish.btn.record.list.pages.editAppTemplate':'编辑应用模版',
  'appPublish.btn.record.list.title.bulk_editPublish':'批量编辑待发布组件',
  'appPublish.btn.record.list.pages.selectAll':'选择全部',
  'appPublish.btn.record.creactAppModel.pages.uploadIcon':'上传图标',
  'appPublish.btn.record.creactAppModel.pages.label.name':'名称',
  'appPublish.btn.record.creactAppModel.pages.label.scope':'发布范围',
  'appPublish.btn.record.creactAppModel.pages.label.org_id':'行业名称',
  'appPublish.btn.record.creactAppModel.pages.label.tag_ids':'分类标签',
  'appPublish.btn.record.creactAppModel.pages.label.describe':'简介',
  'appPublish.btn.record.creactAppModel.pages.label.logo':'LOGO',
  'appPublish.btn.record.creactAppModel.pages.label.max32':'请输入创建的应用模版名称，最大长度32位.',
  'appPublish.btn.record.creactAppModel.pages.label.model_intro':'请输入创建的应用模版简介.',
  'appPublish.btn.record.creactAppModel.pages.label.loadingMore':'加载更多',
  'appPublish.btn.record.creactAppModel.pages.label.present_enterprise':'当前企业',
  'appPublish.btn.record.creactAppModel.pages.label.present_team':'当前团队',
  'appPublish.btn.record.creactAppModel.pages.label.enterprise':'企业',
  'appPublish.btn.record.creactAppModel.pages.label.scope_Publish':'发布模型的可视范围',
  'appPublish.btn.record.makert.select.title':'选择应用商店',
  'appPublish.btn.record.makert.select.store_id':'发布商店',
  'appPublish.btn.record.makert.select.store_id.desc':'选择需要发布的商店名称',
  'appPublish.btn.record.makert.select.desc':'暂无推送权限的应用商店',
  'appPublish.btn.record.makert.select.loading':'应用商店列表加载中...',
  'appPublish.btn.record.makert.publish.log':'日志',
  'appPublish.btn.record.makert.publish.pulgin':'插件:',
  'appPublish.btn.record.makert.publish.component':'组件:',


  

}

//备份
const appBackups = {
  'appBackups.title':'备份管理',
  'appBackups.desc':'应用备份是指将当前应用元数据、持久化数据、版本数据完整备份。备份记录可用于应用迁移与回滚，云端备份记录可用于跨集群应用迁移操作。',
  'appBackups.btn.addBackups':'新增备份',
  'appBackups.btn.importBackups':'导入备份',
  'appBackups.btn.allBackups':'团队全部备份',
  'appBackups.table.backupsTime':'备份时间',
  'appBackups.table.backupsPerson':'备份人',
  'appBackups.table.backupsPattern':'备份模式',
  'appBackups.table.backupsPattern.cloud':'云端备份',
  'appBackups.table.backupsPattern.local':'本地备份',
  'appBackups.table.packetSize':'包大小',
  'appBackups.table.status':'状态',
  'appBackups.table.comment':'备注',
  'appBackups.table.operate':'操作',
  'appBackups.table.btn.recover':'恢复',
  'appBackups.table.btn.removal':'迁移',
  'appBackups.table.btn.export':'导出',
  'appBackups.table.btn.delete':'删除',
  'appBackups.table.pages.is_configed':'备份到云端存储上，可实现跨集群迁移',
  'appBackups.table.pages.no_configed':'需要企业管理员在企业设置中配置 OSS 云对象存储',
  'appBackups.table.pages.label.mode':'备份方式',
  'appBackups.table.pages.label.full-online':'云端备份',
  'appBackups.table.pages.label.full-offline':'本地备份',
  'appBackups.table.pages.label.tooltip.title':'备份到当前集群本地，不能跨集群迁移',
  'appBackups.table.pages.label.note':'备份说明',
  'appBackups.table.pages.abnormal.custom':'备份有异常 ：组件使用了自定义存储，是否强制备份',
  'appBackups.table.pages.abnormal.not_stop':'备份有异常 ：有状态组件未停止，是否强制备份',
  'appBackups.table.pages.model.migration':'当前备份模式是本地模式，不能进行跨集群迁移',
  'appBackups.table.pages.migration.title':'迁移',
  'appBackups.table.pages.migration.teamOrCluster':'请选择迁移的团队和集群',
  'appBackups.table.pages.importBackup.title':'请导入备份',
  'appBackups.importBackup.select.file':'请选择文件',


}

//网关
const appGateway = {
  'appGateway.title':'网关访问策略管理',
  'appGateway.desc':'访问策略是指从集群外访问组件的方式，包括使用HTTP域名访问或IP+Port(TCP/UDP)访问，这里仅管理当前应用下的所有组件的访问策略。',
  'appGateway.placeholder.domain':'搜索域名/组件',
  'appGateway.placeholder.port':'搜索端口/组件',
  'appGateway.btn.search':'搜索',
  'appGateway.btn.add':'添加策略',
  'appGateway.table.domain':'域名',
  'appGateway.table.type':'类型',
  'appGateway.table.route':'高级路由',
  'appGateway.table.certificate':'证书',
  'appGateway.table.app':'应用',
  'appGateway.table.port':'组件端口',
  'appGateway.table.operate':'操作',
  'appGateway.table.config':'参数配置',
  'appGateway.table.edit':'编辑',
  'appGateway.table.delete':'删除',
}

//升级
const appUpgrade = {
  'appUpgrade.title':'升级管理',
  'appUpgrade.desc':'当前应用内具有从应用市场或应用商店安装而来的组件时，升级管理功能可用。若安装源的应用版本有变更则可以进行升级操作。',
  'appUpgrade.tabs.list':'应用模型列表',
  'appUpgrade.current_version':'当前版本',
  'appUpgrade.Upgradable_version':'可升级版本',
  'appUpgrade.current_version.tooltip':'当前版本是指安装的组件中最大的版本号，因此升级其中一个组件该版本号跟随增加。',
  'appUpgrade.Upgradable_version.tooltip':'可升级版本是指比当前版本号大的版本',
  'appUpgrade.btn.upgrade':'升级',
  'appUpgrade.btn.addon':'查看组件',
  'appUpgrade.tabs.record':'升级记录',
  'appUpgrade.table.createTime':'创建时间',
  'appUpgrade.table.chart':'名字',
  'appUpgrade.table.app':'应用模版名称',
  'appUpgrade.table.versions':'版本',
  'appUpgrade.table.status':'状态',
  'appUpgrade.table.operate':'操作',
  'appUpgrade.table.operate.roll_back':'回滚',
  'appUpgrade.table.operate.roll_back_record':'回滚记录',
}

//配置
const appConfiguration = {
  'appConfiguration.title':'应用配置组管理',
  'appConfiguration.desc':'配置组是通过环境变量注入到当前应用指定的组件运行环境中。',
  'appConfiguration.placeholder':'搜索配置组名称',
  'appConfiguration.btn.search':'搜索',
  'appConfiguration.btn.add':'添加配置组',
  'appConfiguration.table.name':'配置组名称',
  'appConfiguration.table.createTime':'创建时间',
  'appConfiguration.table.componentNum':'生效组件数',
  'appConfiguration.table.take_effect_component':'生效组件',
  'appConfiguration.table.take_effect':'生效中',
  'appConfiguration.table.not_take_effect':'不生效',
  'appConfiguration.table.status':'生效状态',
  'appConfiguration.table.operate':'操作',
  'appConfiguration.table.btn.edit':'编辑',
  'appConfiguration.table.btn.delete':'删除',
  'appConfiguration.btn.edit':'修改配置组',
  'appConfiguration.table.enable':'生效状态',
  'appConfiguration.table.config_items':'配置项',
  'appConfiguration.table.btn.all':'全选',
  'appConfiguration.table.service_ids':'生效组件',
  'appConfiguration.table.title':'友情提示',
  'appConfiguration.table.save':'是否保存已修改的配置组',
}

//k8s资源
const addKubenetesResource = {
  'addKubenetesResource.title': 'K8s 资源管理',
  'addKubenetesResource.desc': '此处管理直接通过 Yaml 文件部署到 Kubernetes 集群中的资源。',
  'addKubenetesResource.btn.add':'添加',
  'addKubenetesResource.table.name': '资源名称',
  'addKubenetesResource.table.type': '资源类型',
  'addKubenetesResource.table.status': '状态',
  'addKubenetesResource.table.operate': '操作',
  'addKubenetesResource.table.btn.check': '查看',
  'addKubenetesResource.table.btn.edit': '编辑',
  'addKubenetesResource.table.btn.delete': '删除',
  'addKubenetesResource.table.success': '创建成功',
  'addKubenetesResource.table.update_success': '更新成功',
  'addKubenetesResource.table.update_error': '更新失败',
  'addKubenetesResource.table.error': '创建失败',
  'addKubenetesResource.table.checkDetail': '查看详情',
  'addKubenetesResource.table.errorDetail': '失败详情',
  'addKubenetesResource.localContent.yaml': '#请填写yaml文件',
}

//动态
const appDynamic = {
  'appDynamic.title':'动态',
  'appDynamic.desc':'跟踪账号操作记录的查询，可用于安全分析、资源变更追踪以及合规性审计等场景。',
  'appDynamic.table.user':'用户',
  'appDynamic.table.componentName':'组件名称',
  'appDynamic.table.operateTime':'操作时间',
  'appDynamic.table.operateContent':'操作内容',
  'appDynamic.table.operateDetail':'操作详情',
  'appDynamic.table.checkDetail':'查看详情',
  'appDynamic.btn.inquire':'查询',
}

//组件构建检测
const componentCheck = {
  'componentCheck.warehouse_address':'仓库地址',
  'componentCheck.tooltip.title.p1':'取消本选项你可以先对组件进行',
  'componentCheck.tooltip.title.p2':'高级设置再构建启动。',
  'componentCheck.tooltip.title.p3':'组件构建源检测通过仅代表平台可以检测到代码语言类型和代码源。',
  'componentCheck.tooltip.title.p4':'如果检测失败，',
  'componentCheck.tooltip.title.p5':'平台源码支持规范',
  'componentCheck.tooltip.title.p6':'对代码进行调整。',
  'componentCheck.tooltip.title.p7':'组件构建源检测通过仅代表平台可以检测到多模块构建。',
  'componentCheck.tooltip.title.p8':'平台文档',
  'componentCheck.tooltip.title.p9':'可参考',
  'componentCheck.modify_image_name.title':'修改信息',
  'componentCheck.modify_image_name.key.title':'配置授权Key',
  'componentCheck.modify_image_name.label.service_cname':'应用名称',
  'componentCheck.modify_image_name.label.component_cname':'组件名称:',
  'componentCheck.modify_image_name.label.docker_cmd':'镜像地址',
  'componentCheck.modify_image_name.label.username':'仓库用户名',
  'componentCheck.modify_image_name.label.password':'仓库密码',
  'componentCheck.modify_image_name.label.dockerRun':'命令',
  'componentCheck.modify_image_name.label.git_url':'仓库地址',
  'componentCheck.modify_image_name.key.pages.desc':'请拷贝如下Key到您的私有Git仓库进行授权，云帮平台方可访问您的私有Git仓库',
  'componentCheck.advanced.setup':'高级配置',
  'componentCheck.advanced.env':'环境配置',
  'componentCheck.advanced.setup.basic_info':'基础信息设置',
  'componentCheck.advanced.setup.deploy_attr':'部署属性',
  'componentCheck.advanced.setup.deploy_attr.Stateless_type':'无状态类型',
  'componentCheck.advanced.setup.deploy_attr.Other_types':'其他类型',
  'componentCheck.advanced.setup.component_attr':'组件属性',
  'componentCheck.advanced.setup.basic_info.label.extend_method':'组件类型',
  'componentCheck.advanced.setup.basic_info.label.noLimit':'不限制',
  'componentCheck.advanced.setup.basic_info.label.customize':'自定义',
  'componentCheck.advanced.setup.basic_info.label.schedule':'运行规则：',
  'componentCheck.advanced.setup.basic_info.label.min_memory':'内存',
  'componentCheck.advanced.setup.basic_info.label.min_cpu':'CPU',
  'componentCheck.advanced.setup.storage_setting.title':'存储设置',
  'componentCheck.advanced.setup.storage_setting.btn.add':'添加存储',
  'componentCheck.advanced.setup.storage_setting.label.volume_name':'存储名称',
  'componentCheck.advanced.setup.storage_setting.label.volume_path':'挂载路径',
  'componentCheck.advanced.setup.storage_setting.label.volume_type':'存储类型',
  'componentCheck.advanced.setup.storage_setting.label.volume_capacity':'存储容量',
  'componentCheck.advanced.setup.storage_setting.label.status':'状态',
  'componentCheck.advanced.setup.storage_setting.label.action':'操作',
  'componentCheck.advanced.setup.shared_storage.title':'共享存储',
  'componentCheck.advanced.setup.storage_config.title':'存储配置',
  'componentCheck.advanced.setup.storage_config.desc':'将容器内的目录持久化，以防止业务数据丢失。',
  'componentCheck.advanced.setup.storage_config.name':'存储名称:',
  'componentCheck.advanced.setup.shared_storage.btn.add':'挂载共享存储',
  'componentCheck.advanced.setup.shared_storage.label.local_vol_path':'本地挂载路径',
  'componentCheck.advanced.setup.shared_storage.label.dep_vol_name':'目标存储名称',
  'componentCheck.advanced.setup.shared_storage.label.dep_vol_path':'目标挂载路径',
  'componentCheck.advanced.setup.shared_storage.label.dep_vol_type':'目标存储类型',
  'componentCheck.advanced.setup.shared_storage.label.dep_app_name':'目标所属组件',
  'componentCheck.advanced.setup.shared_storage.label.dep_app_group':'目标组件所属应用',
  'componentCheck.advanced.setup.shared_storage.label.action':'操作',
  'componentCheck.advanced.setup.mount_share_path.title':'挂载共享目录',
  'componentCheck.advanced.setup.mount_share_path.label.localpath':'本地挂载路径',
  'componentCheck.advanced.setup.mount_share_path.label.dep_vol_name':'目标存储名称',
  'componentCheck.advanced.setup.mount_share_path.label.dep_vol_path':'目标挂载路径',
  'componentCheck.advanced.setup.mount_share_path.label.dep_vol_type':'目标存储类型',
  'componentCheck.advanced.setup.mount_share_path.label.dep_app_name':'目标所属组件',
  'componentCheck.advanced.setup.mount_share_path.label.dep_app_group':'目标组件所属应用',
  'componentCheck.advanced.setup.mount_share_path.msg.selectedRowKeys':'请选择要挂载的目录',
  'componentCheck.advanced.setup.mount_share_path.msg.local':'请检查本地存储目录是否填写',
  'componentCheck.advanced.setup.mount_share_path.msg.localPath':'请输入本地挂载路径',
  'componentCheck.advanced.setup.mount_share_path.msg.isMountPath':'路径为系统保留路径，请更换其他路径',
  'componentCheck.advanced.setup.component_dependency.title':'组件依赖',
  'componentCheck.advanced.setup.component_dependency.table.service_cname':'组件名称',
  'componentCheck.advanced.setup.component_dependency.table.group_name':'所属组',
  'componentCheck.advanced.setup.component_dependency.table.var':'操作',
  'componentCheck.advanced.setup.component_dependency.table.btn.href':'查看链接信息',
  'componentCheck.advanced.setup.component_dependency.table.btn.rely_on':'取消依赖',
  'componentCheck.advanced.setup.depend_msg.title':'依赖信息查看',
  'componentCheck.advanced.setup.depend_msg.table.attr_name':'变量名',
  'componentCheck.advanced.setup.depend_msg.table.attr_value':'变量值',
  'componentCheck.advanced.setup.depend_msg.table.name':'说明',
  'componentCheck.advanced.setup.port_manage.title':'端口管理',
  'componentCheck.advanced.setup.environment_variable.title':'环境变量',
  'componentCheck.advanced.setup.port_manage.btn.null':'暂无端口',
}

const otherAppAssembly = {
  'otherApp.marketDrawer.edition':'版本:',
  'otherApp.marketDrawer.click':'点击安装',
  'otherApp.marketDrawer.not':'不可安装',
  'otherApp.marketDrawer.Memory':'内存:',
  'otherApp.marketDrawer.Select_version':'选择版本',
  'otherApp.marketDrawer.input_version':'请选择版本',
  'otherApp.marketDrawer.more':'查看更多...',
  'otherApp.marketDrawer.creat':'创建组件',
  'otherApp.marketDrawer.store':'获取云应用商店授权',
  
  // yaml上传
  'otherApp.UploadYaml.name_en':'请输入组件英文名称',
  'otherApp.UploadYaml.only':'只支持小写字母、数字或“-”，并且必须以字母开始、以数字或字母结尾',
  'otherApp.UploadYaml.max':'不能大于32个字符',
  'otherApp.UploadYaml.name':'应用名称',
  'otherApp.UploadYaml.app':'请选择要所属应用',
  'otherApp.UploadYaml.up':'上传文件',
  'otherApp.UploadYaml.yaml':'支持yaml、yml格式上传文件',
  'otherApp.UploadYaml.placese_up':'请上传文件',
  'otherApp.UploadYaml.creat':'确认创建',

  // jar上传
  'otherApp.UploadJarWar.name':'组件名称',
  'otherApp.UploadJarWar.input_name':'要创建的组件还没有名字',
  'otherApp.UploadJarWar.max':'最大长度24位',
  'otherApp.UploadJarWar.placese':'请为创建的组件起个名字吧',
  'otherApp.UploadJarWar.en_name':'组件英文名称',
  'otherApp.UploadJarWar.input_en_name':'请输入组件的英文名称',
  'otherApp.UploadJarWar.up':'上传文件',
  'otherApp.UploadJarWar.jar':'支持Jar、War、Zip、Tar格式上传文件',
  'otherApp.UploadJarWar.new':'新建组件',

  'otherApp.AppMoveGroup.title':'修改组件所属应用',
  'otherApp.AppMoveGroup.message':'不能为空!',

}
const topology = {
  'topology.Topological.start':'启动',
  'topology.Topological.stop':'关闭',
  'topology.Topological.rolling':'更新',
  'topology.Topological.build':'构建',
  'topology.Topological.title':'友情提示',
  'topology.Topological.determine':'确定',
  'topology.Topological.now':'当前组件？',
  'topology.Topological.label':'网关',
  'topology.Topological.yes_or_no':'是否取消',
  'topology.Topological.Rely_on':'依赖',
  'topology.Topological.Shut_down':'是否关闭',
  'topology.Topological.all_port':'组件的所有对外端口',
  'topology.Topological.Did_not_open_port':'组件未开启对外端口',
  'topology.Topological.associated':'要关联的',
  'topology.Topological.opne':'组件暂未开启对内端口，是否打开?',
  'topology.Topological.port':'选择端口',
  'topology.Topological.input_port':'请选择端口',
}

const JavaMaven = {
  'JavaMaven.Alert':'以下为检测出的Maven多模块项目的模块信息, 请选择需要构建的模块, 并确认构建信息',
  'JavaMaven.name':'模块名称',
  'JavaMaven.cname':'组件名称',
  'JavaMaven.packaging':'包类型',
  'JavaMaven.envs':'构建变量信息',
  'JavaMaven.OPTS':'Maven构建参数',
  'JavaMaven.GOALS':'Maven构建命令',
  'JavaMaven.startValue':'启动命令',
  'JavaMaven.index':'端口',
  'JavaMaven.id':'操作',
  'JavaMaven.cname_input':'请输入组件命令',
  'JavaMaven.bulid':'构建命令',
  'JavaMaven.bulid_input':'请输入构建命令',
  'JavaMaven.start':'启动命令',
  'JavaMaven.start_input':'请输入启动命令',
  'JavaMaven.title':'JavaMaven多模块设置',
  'JavaMaven.Tooltip':'取消本选项,不构建启动。',
  'JavaMaven.arch':'cpu架构',
}
const helmAppInstall = {
  //安装检测主页
  'helmAppInstall.index.delete':'商店已被删除、无法更新。',
  'helmAppInstall.index.no':'应用模板不存在、无法更新',
  'helmAppInstall.index.input_config':'请填写配置项',
  'helmAppInstall.index.reinstall':'重新安装',
  'helmAppInstall.index.up':'升级',
  'helmAppInstall.index.install':'安装',
  'helmAppInstall.index.updata_info':'版本信息更新中、请耐心等待',
  'helmAppInstall.index.detection_failure':'应用包检验失败',
  'helmAppInstall.index.detection_back':'应用包检验失败,请退出重试！',
  'helmAppInstall.index.install_failure':'安装失败',
  'helmAppInstall.index.install_back':'安装失败,请退出重试！',
  'helmAppInstall.index.back':'退出',
  'helmAppInstall.index.detection_success':'应用包检验成功',
  'helmAppInstall.index.detection_next':'应用包检验成功,点击下一步进行配置与安装。',
  'helmAppInstall.index.next':'下一步',
  'helmAppInstall.index.detecting':'应用包检验中',
  'helmAppInstall.index.detecting_await':'应用包检验中,请耐心等候...',
  'helmAppInstall.index.Being_reinstalled':'重新安装中',
  'helmAppInstall.index.in_upgrade':'升级中',
  'helmAppInstall.index.in_install':'安装中',
  'helmAppInstall.index.need_time':'这可能需要一些时间,请耐心等候...',
  'helmAppInstall.index.key':'关键字',
  'helmAppInstall.index.new':'最新版本',
  'helmAppInstall.index.now_version':'当前版本为 { lowVs }',
  'helmAppInstall.index.error':'失败原因：',

  // 升级页面
  'helmAppInstall.Upgrade.store':'通过应用商店（',
  'helmAppInstall.Upgrade.from':'）从版本',
  'helmAppInstall.Upgrade.to':'升级到',
  'helmAppInstall.Upgrade.form_version':'从版本',
  'helmAppInstall.Upgrade.to_version':'升级到',
  'helmAppInstall.Upgrade.no':'暂无',
  'helmAppInstall.Upgrade.reinstall':'重新安装',
  'helmAppInstall.Upgrade.updat_info':'升级提示',
  'helmAppInstall.Upgrade.Continue':'继续',
  'helmAppInstall.Upgrade.new':'新升级',
  'helmAppInstall.Upgrade.cancel':'取消',
  'helmAppInstall.Upgrade.model':'应用模型',
  'helmAppInstall.Upgrade.again':'上次升级任务部分组件更新成功，是否继续重试？',
  'helmAppInstall.Upgrade.failure':'上次升级任务部署失败，是否继续重试？',
  'helmAppInstall.Upgrade.unfinished':'存在未完成的升级任务，是否继续完成上次任务？',
  'helmAppInstall.Upgrade.back_info':'回滚提示',
  'helmAppInstall.Upgrade.down':'关闭',
  'helmAppInstall.Upgrade.Rollback':'存在未完成的回滚任务，无法继续升级',
  'helmAppInstall.Upgrade.Rollback_confirm':'回滚确认',
  'helmAppInstall.Upgrade.rollback_confirm':'确认要回滚吗？',
  'helmAppInstall.Upgrade.not_add':'回滚过程不会删除新增组件。',
  // 升级信息展示页面
  'helmAppInstall.UpgradeInfo.add_com':'新增组件',
  'helmAppInstall.UpgradeInfo.change':'组件无变更',
  'helmAppInstall.UpgradeInfo.select':'请选择要升级的版本',
  'helmAppInstall.UpgradeInfo.no_updatae':'暂无可升级的版本',
  'helmAppInstall.UpgradeInfo.add':'新增',
  'helmAppInstall.UpgradeInfo.updata':'更新',
  'helmAppInstall.UpgradeInfo.remove':'移除',
  'helmAppInstall.UpgradeInfo.survival':'存活探针',
  'helmAppInstall.UpgradeInfo.ready':'就绪探针',
  'helmAppInstall.UpgradeInfo.healthy':'健康检测',
  'helmAppInstall.UpgradeInfo.edition':'源组件构建版本',
  'helmAppInstall.UpgradeInfo.from':'从',
  'helmAppInstall.UpgradeInfo.to':'变更为',
  'helmAppInstall.UpgradeInfo.info':'连接信息',
  'helmAppInstall.UpgradeInfo.unit':'插件',
  'helmAppInstall.UpgradeInfo.variable':'环境变量',
  'helmAppInstall.UpgradeInfo.port':'端口',
  'helmAppInstall.UpgradeInfo.storage':'存储',
  'helmAppInstall.UpgradeInfo.mount':'存储挂载',
  'helmAppInstall.UpgradeInfo.comm':'依赖组件',
  'helmAppInstall.UpgradeInfo.add_from':'新增对',
  'helmAppInstall.UpgradeInfo.rely_on':'组件的依赖',
  'helmAppInstall.UpgradeInfo.remove_on':'移除对',
  'helmAppInstall.UpgradeInfo.dependent':'依赖的存储',
  'helmAppInstall.UpgradeInfo.comm_group':'应用配置组',
  'helmAppInstall.UpgradeInfo.app_group':'应用配置组：',
  'helmAppInstall.UpgradeInfo.point':'监控点',
  'helmAppInstall.UpgradeInfo.point_Chart':'监控图表',
  'helmAppInstall.UpgradeInfo.k8s':'K8S 属性',
  'helmAppInstall.UpgradeInfo.hand':'滚动更新操作失败，请前往组件页面手动操作',
  'helmAppInstall.UpgradeInfo.success':'成功',
  'helmAppInstall.UpgradeInfo.can_updata':'可升级',
  'helmAppInstall.UpgradeInfo.Not_upgradeable':'新版本无该组件，不可升级',
  'helmAppInstall.UpgradeInfo.comm_no_updata':'组件无变更，升级只改变版本号',
  'helmAppInstall.UpgradeInfo.add_comm':'新增组件',
  'helmAppInstall.UpgradeInfo.not_started':'升级任务未开始',
  'helmAppInstall.UpgradeInfo.implementation':'的升级任务执行中',
  'helmAppInstall.UpgradeInfo.succeeded':'的升级任务执行成功',
  'helmAppInstall.UpgradeInfo.failed':'的升级任务执行失败',
  'helmAppInstall.UpgradeInfo.Deployment_failed':'的升级任务执行部署失败',
  'helmAppInstall.UpgradeInfo.now_version':'当前版本',
  'helmAppInstall.UpgradeInfo.form_version':'从版本',
  'helmAppInstall.UpgradeInfo.Administration':'应用升级管理',
  'helmAppInstall.UpgradeInfo.application':'当前应用内具有从组件库或应用商店安装而来的组件时，升级管理功能可用。若安装源的应用版本有变更则可以进行升级操作。',
  'helmAppInstall.UpgradeInfo.updata_to':'升级到',
  'helmAppInstall.UpgradeInfo.select':'请选择',
  'helmAppInstall.UpgradeInfo.select_comm':'请选择需要升级的组件',
  'helmAppInstall.UpgradeInfo.app_Details':'应用属性变更详情',
  'helmAppInstall.UpgradeInfo.comm_Details':'组件属性变更详情',
  'helmAppInstall.UpgradeInfo.back':'返回',
  'helmAppInstall.UpgradeInfo.retry':'重试',
  'helmAppInstall.UpgradeInfo.version':'版本',
}
export default Object.assign({}, appOverview, appPublish, appBackups, appConfiguration, appUpgrade, appConfiguration, addKubenetesResource, appDynamic, componentCheck, appGateway, otherAppAssembly, topology, JavaMaven, helmAppInstall);