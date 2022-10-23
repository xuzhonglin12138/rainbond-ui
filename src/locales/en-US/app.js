// 应用下的信息

//应用总览
const appOverview = {
  'appOverview.memory': 'Memory Usage',
  'appOverview.cpu': 'CPU Usage',
  'appOverview.disk': 'Disk Usage',
  'appOverview.componentNum': 'Components',
  'appOverview.createTime': 'Create Time',
  'appOverview.updateTime': 'Update Time',
  'appOverview.govern': 'Governance Mode',
  'appOverview.principal': 'Manager',
  'appOverview.backups': 'Backup',
  'appOverview.modelRelease': 'Model publishing',
  'appOverview.gateway': 'Gateway Strategies',
  'appOverview.upgrade': 'To Upgrade',
  'appOverview.config': 'Config Group',
  'appOverview.btn.update':'Upgrade',
  'appOverview.btn.build':'Build',
  'appOverview.btn.copy':'Rapid replication',
  'appOverview.btn.visit':'Access',
  'appOverview.btn.start':'Start',
  'appOverview.btn.stop':'Stop',
  'appOverview.btn.change':'Switch',
  'appOverview.btn.ordinary':'Normal Mode',
  'appOverview.btn.aggregation':'Aggregation Mode',
  'appOverview.btn.arrange':'Arrangement Mode',
  'appOverview.btn.addComponent':'Add Component',
  'appOverview.topology': 'Topology',
  'appOverview.list': 'List',
  'appOverview.list.table.btn.name': 'Component Name',
  'appOverview.list.table.memory': 'Memory',
  'appOverview.list.table.status': 'Status',
  'appOverview.list.table.updateTime': 'Update Time',
  'appOverview.list.table.operate': 'Operation',
  'appOverview.list.table.restart': 'Restart',
  'appOverview.list.table.delete': 'Delete',
  'appOverview.list.table.start': 'Start',
  'appOverview.list.table.stop': 'Stop',
  'appOverview.list.table.batchOperate': 'Batch Operation',
  'appOverview.list.input.seach.hint': 'Please search for components',
  'appOverview.list.btn.seach': 'Search',
  'appOverview.no_limit': 'Unlimited',
  'appOverview.serviceNum': 'Component number',
  'appOverview.principal.username': 'Account:',
  'appOverview.principal.principal': 'Name:',
  'appOverview.principal.email': 'Email:',
  'appOverview.versions': 'Version Number',
  'appOverview.shop': 'Store',
  'appOverview.shopDelete':'The store has been deleted',
  'appOverview.list.table.move': 'Move',
  'appOverview.list.table.btn.third_party': 'Third-party Components',
  'appOverview.list.btn.addComponent.code.title': 'Start with the source code',
  'appOverview.list.btn.addComponent.custom': 'Custom Repository',
  'appOverview.list.btn.addComponent.support': 'Note: support',
  'appOverview.list.btn.addComponent.standard': 'And other language specifications',
  'appOverview.list.btn.addComponent.image.title': 'Start with the mirror image',
  'appOverview.list.btn.addComponent.image': 'Image',
  'appOverview.list.btn.addComponent.dockerRun': 'DockerRun',
  'appOverview.list.btn.addComponent.market.title': 'Start with the app market',
  'appOverview.list.btn.addComponent.update.title': 'Start by uploading the package',
  'appOverview.list.btn.addComponent.jwar': 'Jar、War',
  'appOverview.list.btn.addComponent.yaml': 'Yaml',
  'appOverview.list.btn.addComponent.project': 'Project',

  //helm 应用
  'appOverview.helm.title': 'Service instance',
  'appOverview.helm.componentDetail': 'Component details',
  'appOverview.helm.pages.desc.service': 'Cannot query the instance list because no Service is defined for the current application',
  'appOverview.helm.pages.result.init': 'Initializing...',
  'appOverview.helm.pages.result.install': 'In the installation...',
  'appOverview.helm.pages.result.loading': 'This process may take some time. Please wait patiently',
  'appOverview.helm.pages.yaml.yamlMsg': 'Fill in the configuration',
  'appOverview.helm.pages.yaml.templateFile': 'Values file',
  'appOverview.helm.pages.alert.message': 'If the application version does not exist, select a new version',
  'appOverview.helm.pages.current_version': '{ version } current version',
  'appOverview.helm.pages.version': 'Version',
  'appOverview.helm.pages.overrides': 'Configuration Values',
  'appOverview.helm.pages.over_hr': 'General configuration',
  'appOverview.helm.pages.appIntroduce': 'Application introduced',
  'appOverview.helm.pages.explain': 'Application configuration description and usage overview',
  'appOverview.helm.pages.option': 'Configuration options',
  'appOverview.helm.pages.standard': 'View and set the application configuration based on Helm specification',

};

//应用发布
const appPublish = {
  'appPublish.title': 'Publish Management',
  'appPublish.desc': 'Application publishing means to model the currently running applications, form application templates and release them to the enterprise application market or cloud application store, so as to support standardized application delivery or sharing',
  'appPublish.btn.local':'Publish to Local',
  'appPublish.btn.market':'Publish to Cloud',
  'appPublish.table.publishName':'App Template Name',
  'appPublish.table.versions':'Version(alias)',
  'appPublish.table.versions.null':'No version description is available',
  'appPublish.table.versions.notSpecified':'Not Specified',
  'appPublish.table.scope':'Scope',
  'appPublish.table.scope.market':'App market',
  'appPublish.table.scope.team_market':'App market(Team)',
  'appPublish.table.scope.enterprise_market':'App market(Enterprise)',
  'appPublish.table.scope.app_shop':'App store',
  'appPublish.table.publishTime':'Time',
  'appPublish.table.status':'Status',
  'appPublish.table.status.release':'Publishing',
  'appPublish.table.status.release_finish':'Complete',
  'appPublish.table.status.canceled':'Canceled',
  'appPublish.table.operate':'Operation',
  'appPublish.table.btn.delete':'Delete',
  'appPublish.table.btn.confirm_delete':'Do you want to delete the current record',
  'appPublish.table.btn.confirm':'Confirm',
  'appPublish.table.btn.cancel':'Cancel',
  'appPublish.table.btn.continue':'Continue',
  'appPublish.table.btn.release_cancel':'Cancel',
  'appPublish.shop.pages.title.joinMsg':'Connection information',
  'appPublish.shop.pages.title.random':'Generating random values',
  'appPublish.shop.pages.title.environment_variable':'Environment variable',
  'appPublish.shop.pages.title.flexible':'Scaling rules',
  'appPublish.shop.pages.form.label.min_node':'Minimum node (number)',
  'appPublish.shop.pages.form.label.max_node':'Maximum node (number)',
  'appPublish.shop.pages.form.label.step_node':'Node step size (number)',
  'appPublish.shop.pages.form.label.init_memory':'Initial memory (M)',
  'appPublish.shop.pages.form.label.container_cpu':'Initial CPU (m)',
  'appPublish.shop.pages.form.quota0.desc':'Memory allocation 0 is not limited.',
  'appPublish.shop.pages.form.quota1000.desc':'CPU allocation 0: unlimited. 1000 m = 1 Core.',
  'appPublish.shop.pages.confirm.title':'The current Release version is in the Release state, and the Release state will be cancelled after the Release is successful',
  'appPublish.btn.record.list.title':'Release Record List',
  'appPublish.btn.record.list.title.versions':'App Template Configs',
  'appPublish.btn.record.list.title.appMode':'App Template',
  'appPublish.btn.record.list.label.version':'Version',
  'appPublish.btn.record.list.label.version_alias':'Version Alias',
  'appPublish.btn.record.list.label.is_plugin':'As Plugin',
  'appPublish.btn.record.list.label.describe':'Notes',
  'appPublish.btn.record.list.label.newAppTemplate':'Create',
  'appPublish.btn.record.list.label.deitAppTemplate':'Edit',
  'appPublish.btn.record.list.title.publish_component_config':'Component Configs',
  'appPublish.btn.record.list.title.publish_pluginMsg':'Plugin Information',
  'appPublish.btn.record.list.title.edit_publish_componentMsg':'Edit publish component information',
  'appPublish.btn.record.list.title.bulk_edit':'Batch Edit',
  'appPublish.btn.record.list.table.plugin_alias':'Name',
  'appPublish.btn.record.list.table.category':'Classification',
  'appPublish.btn.record.list.table.build_version':'Version',
  'appPublish.btn.record.list.title.k8s':'K8S Resources',
  'appPublish.btn.record.list.table.name':'Name',
  'appPublish.btn.record.list.table.kind':'Type',
  'appPublish.btn.record.list.table.content':'Details',
  'appPublish.btn.record.list.table.view_details':'View',
  'appPublish.btn.record.list.title.detailMsg':'Details information',
  'appPublish.btn.record.list.title.check':'Depend test',
  'appPublish.btn.record.list.pages.needPublish':'The component is required to be published',
  'appPublish.btn.record.list.pages.componentPublish':'Component dependencies, are you sure you want to cancel the publication of this component?',
  'appPublish.btn.record.list.pages.createAppTemplate':'Create app template',
  'appPublish.btn.record.list.pages.editAppTemplate':'Edit App Template',
  'appPublish.btn.record.list.title.bulk_editPublish':'Batch edit components to be published',
  'appPublish.btn.record.list.pages.selectAll':'Select all',
  'appPublish.btn.record.creactAppModel.pages.uploadIcon':'Upload',
  'appPublish.btn.record.creactAppModel.pages.label.name':'Name',
  'appPublish.btn.record.creactAppModel.pages.label.scope':'Scope',
  'appPublish.btn.record.creactAppModel.pages.label.org_id':'Name industry',
  'appPublish.btn.record.creactAppModel.pages.label.tag_ids':'Category labels',
  'appPublish.btn.record.creactAppModel.pages.label.describe':'Introduction',
  'appPublish.btn.record.creactAppModel.pages.label.logo':'LOGO',
  'appPublish.btn.record.creactAppModel.pages.label.max32':'Enter the name of the application template to be created. The name contains a maximum of 32 characters.',
  'appPublish.btn.record.creactAppModel.pages.label.model_intro':'Please enter the profile of the created application template.',
  'appPublish.btn.record.creactAppModel.pages.label.loadingMore':'Load more',
  'appPublish.btn.record.creactAppModel.pages.label.present_enterprise':'Enterprise',
  'appPublish.btn.record.creactAppModel.pages.label.present_team':'Current team',
  'appPublish.btn.record.creactAppModel.pages.label.enterprise':'Enterprise',
  'appPublish.btn.record.creactAppModel.pages.label.scope_Publish':'The visual scope of the publication model',
  'appPublish.btn.record.makert.select.title':'Choose App Store',
  'appPublish.btn.record.makert.select.store_id':'Target: ',
  'appPublish.btn.record.makert.select.store_id.desc':'Select the store name you want to publish',
  'appPublish.btn.record.makert.select.desc':'The app store does not have push permission',
  'appPublish.btn.record.makert.select.loading':'The app store list is loading...',
  'appPublish.btn.record.makert.publish.log':'Log',
  'appPublish.btn.record.makert.publish.pulgin':'Plugin:',
  'appPublish.btn.record.makert.publish.component':'Component:',
}

//备份
const appBackups = {
  'appBackups.title':'Backup management',
  'appBackups.desc':'Application backup is a complete backup of the metadata, persistent data, and version data of the current application. Backup records can be used for application migration and rollback, and cloud backup records can be used for cross-cluster application migration',
  'appBackups.btn.addBackups':'Create',
  'appBackups.btn.importBackups':'Import',
  'appBackups.btn.allBackups':'All Backups',
  'appBackups.table.backupsTime':'Backup Time',
  'appBackups.table.backupsPerson':'Backup Person',
  'appBackups.table.backupsPattern':'Backup Mode',
  'appBackups.table.backupsPattern.cloud':'Cloud backup',
  'appBackups.table.backupsPattern.local':'Local backup',
  'appBackups.table.packetSize':'Size',
  'appBackups.table.status':'Status',
  'appBackups.table.comment':'Note',
  'appBackups.table.operate':'Operation',
  'appBackups.table.btn.recover':'Restore',
  'appBackups.table.btn.removal':'Migration',
  'appBackups.table.btn.export':'Export',
  'appBackups.table.btn.delete':'Delete',
  'appBackups.table.pages.is_configed':'The data is backed up to the cloud storage system for cross-cluster migration',
  'appBackups.table.pages.no_configed':'An enterprise administrator needs to configure the OSS cloud object storage in enterprise Settings',
  'appBackups.table.pages.label.mode':'Backups',
  'appBackups.table.pages.label.full-online':'Cloud backup',
  'appBackups.table.pages.label.full-offline':'Local backup',
  'appBackups.table.pages.label.tooltip.title':'The data is backed up to the local directory of the current cluster and cannot be migrated across clusters',
  'appBackups.table.pages.label.note':'Notes',
  'appBackups.table.pages.abnormal.custom':'If the component uses user-defined storage, determine whether to forcibly back up data',
  'appBackups.table.pages.abnormal.not_stop':'If there is an exception in the backup, determine whether to forcibly back up stateful components',
  'appBackups.table.pages.model.migration':'The current backup mode is local and cannot be migrated across clusters',
  'appBackups.table.pages.migration.title':'Migration',
  'appBackups.table.pages.migration.teamOrCluster':'Select teams and clusters to migrate',
  'appBackups.table.pages.importBackup.title':'Please import backup',
  'appBackups.importBackup.select.file':'Please select file',
}

//网关
const appGateway = {
  'appGateway.title':'Gateway access policy management',
  'appGateway.desc':'Access policies are used to access components from outside the cluster, including HTTP domain name access or IP+Port(TCP/UDP) access. Only the access policies of all components in the current application are managed',
  'appGateway.placeholder.domain':'Search for domain name/component',
  'appGateway.placeholder.port':'Search for ports/components',
  'appGateway.btn.search':'Search',
  'appGateway.btn.add':'Add policy',
  'appGateway.table.domain':'Domain',
  'appGateway.table.type':'Type',
  'appGateway.table.route':'Advanced routing',
  'appGateway.table.certificate':'Certificate',
  'appGateway.table.app':'App',
  'appGateway.table.port':'Component ports',
  'appGateway.table.operate':'Operation',
  'appGateway.table.config':'Parameter configuration',
  'appGateway.table.edit':'Edit',
  'appGateway.table.delete':'Delete',
}

//升级
const appUpgrade = {
  'appUpgrade.title':'Upgrade management',
  'appUpgrade.desc':'Upgrade management is available when the current application has components installed from the app Marketplace or app store. If the application version of the installation source is changed, you can upgrade it',
  'appUpgrade.tabs.list':'App Templates',
  'appUpgrade.current_version':'Current version',
  'appUpgrade.Upgradable_version':'Upgradable version',
  'appUpgrade.current_version.tooltip':'The current version refers to the largest version number of the installed components. Therefore, if you upgrade one component, the version number increases.',
  'appUpgrade.Upgradable_version.tooltip':'An upgradeable version refers to a version that is older than the current version',
  'appUpgrade.btn.upgrade':'Upgrade',
  'appUpgrade.btn.addon':'Check component',
  'appUpgrade.tabs.record':'Upgrade record',
  'appUpgrade.table.createTime':'Create Time',
  'appUpgrade.table.chart':'Name',
  'appUpgrade.table.app':'App Template Name',
  'appUpgrade.table.versions':'Version',
  'appUpgrade.table.status':'Status',
  'appUpgrade.table.operate':'Operation',
  'appUpgrade.table.operate.roll_back':'Rollback',
  'appUpgrade.table.operate.roll_back_record':'Rollback Records',
}

//配置
const appConfiguration = {
  'appConfiguration.title':'App config group management',
  'appConfiguration.desc':'Config groups are injected into the running environment of the component specified by the current application through environment variables',
  'appConfiguration.placeholder':'Search for the name',
  'appConfiguration.btn.search':'Search',
  'appConfiguration.btn.add':'Add',
  'appConfiguration.table.name':'Name',
  'appConfiguration.table.createTime':'Create Time',
  'appConfiguration.table.componentNum':'Effective Components',
  'appConfiguration.table.take_effect_component':'Effective Components',
  'appConfiguration.table.take_effect':'Effect',
  'appConfiguration.table.not_take_effect':'Do not take effect',
  'appConfiguration.table.status':'Effective State',
  'appConfiguration.table.operate':'Operation',
  'appConfiguration.table.btn.edit':'Edit',
  'appConfiguration.table.btn.delete':'Delete',
  'appConfiguration.btn.edit':'Modify Config Group',
  'appConfiguration.table.enable':'Effective State',
  'appConfiguration.table.config_items':'Config Items',
  'appConfiguration.table.btn.all':'Select All',
  'appConfiguration.table.service_ids':'Effective Components',
  'appConfiguration.table.title':'Helpful hints',
  'appConfiguration.table.save':'Whether to save the modified configuration group',
}

//k8s资源
const addKubenetesResource = {
  'addKubenetesResource.title': 'K8s Resource management',
  'addKubenetesResource.desc': 'Resources deployed directly to the Kubernetes cluster via Yaml files are managed here.',
  'addKubenetesResource.btn.add':'Add',
  'addKubenetesResource.table.name': 'Name',
  'addKubenetesResource.table.type': 'Type',
  'addKubenetesResource.table.status': 'Status',
  'addKubenetesResource.table.operate': 'Operation',
  'addKubenetesResource.table.btn.check': 'View',
  'addKubenetesResource.table.btn.edit': 'Edit',
  'addKubenetesResource.table.btn.delete': 'Delete',
  'addKubenetesResource.table.success': 'Create successful',
  'addKubenetesResource.table.update_success': 'Update successful',
  'addKubenetesResource.table.update_error': 'Update failed',
  'addKubenetesResource.table.error': 'Create failed',
  'addKubenetesResource.table.checkDetail': 'Details',
  'addKubenetesResource.table.errorDetail': 'Failure Details',
  'addKubenetesResource.localContent.yaml': '#Please fill in the YAML file',
}

//动态
const appDynamic = {
  'appDynamic.title':'Dynamic',
  'appDynamic.desc':'Tracing account operation records can be used in scenarios such as security analysis, resource change tracing, and compliance audit.',
  'appDynamic.table.user':'User',
  'appDynamic.table.componentName':'Component Name',
  'appDynamic.table.operateTime':'Operating time',
  'appDynamic.table.operateContent':'Operating content',
  'appDynamic.table.operateDetail':'Operation details',
  'appDynamic.table.checkDetail':'Check details',
  'appDynamic.btn.inquire':'Query',
}

//组件构建检测
const componentCheck = {
  'componentCheck.warehouse_address':'Repo Address',
  'componentCheck.tooltip.title.p1':'Uncheck this option and you can do it on the component first',
  'componentCheck.tooltip.title.p2':'Advanced settings and build run.',
  'componentCheck.tooltip.title.p3':'Component build source detection detects code language types and code sources by representing only the platform.',
  'componentCheck.tooltip.title.p4':'More than 90% of users can be successfully deployed after passing the test. If the deployment fails, see',
  'componentCheck.tooltip.title.p5':'Platform source code support specification',
  'componentCheck.tooltip.title.p6':'Make adjustments to the code.',
  'componentCheck.tooltip.title.p7':'Component build source detection can detect multi-module builds by representing only the platform.',
  'componentCheck.tooltip.title.p8':'Platform document',
  'componentCheck.modify_image_name.title':'Modify information',
  'componentCheck.modify_image_name.key.title':'Configuring Authorization Key',
  'componentCheck.modify_image_name.label.service_cname':'App Name',
  'componentCheck.modify_image_name.label.component_cname':'Component Name:',
  'componentCheck.modify_image_name.label.docker_cmd':'Image',
  'componentCheck.modify_image_name.label.username':'Username',
  'componentCheck.modify_image_name.label.password':'Password',
  'componentCheck.modify_image_name.label.dockerRun':'Command',
  'componentCheck.modify_image_name.label.git_url':'Repo Address',
  'componentCheck.modify_image_name.key.pages.desc':'Please copy the following Key to your private Git repository for authorization so that Cloud help platform can access your private Git repository',
  'componentCheck.advanced.setup':'Advanced Settings',
  'componentCheck.advanced.setup.basic_info':'Basic Info',
  'componentCheck.advanced.setup.deploy_attr':'Deploy properties',
  'componentCheck.advanced.setup.component_attr':'Config',
  'componentCheck.advanced.setup.basic_info.label.extend_method':'Component Type',
  'componentCheck.advanced.setup.basic_info.label.noLimit':'Unlimited',
  'componentCheck.advanced.setup.basic_info.label.schedule':'Operating rules：',
  'componentCheck.advanced.setup.basic_info.label.min_memory':'Memory',
  'componentCheck.advanced.setup.basic_info.label.min_cpu':'CPU',
  'componentCheck.advanced.setup.storage_setting.title':'Storage Setting',
  'componentCheck.advanced.setup.storage_setting.btn.add':'Add Storage',
  'componentCheck.advanced.setup.storage_setting.label.volume_name':'Name',
  'componentCheck.advanced.setup.storage_setting.label.volume_path':'Mount Path',
  'componentCheck.advanced.setup.storage_setting.label.volume_type':'Storage Type',
  'componentCheck.advanced.setup.storage_setting.label.volume_capacity':'Storage Capacity',
  'componentCheck.advanced.setup.storage_setting.label.status':'State',
  'componentCheck.advanced.setup.storage_setting.label.action':'Operation',
  'componentCheck.advanced.setup.shared_storage.title':'Shared storage',
  'componentCheck.advanced.setup.shared_storage.btn.add':'Example Mount shared storage device',
  'componentCheck.advanced.setup.shared_storage.label.local_vol_path':'Local mount path',
  'componentCheck.advanced.setup.shared_storage.label.dep_vol_name':'Target Storage Name',
  'componentCheck.advanced.setup.shared_storage.label.dep_vol_path':'Target Mount Path',
  'componentCheck.advanced.setup.shared_storage.label.dep_vol_type':'Target Storage Type',
  'componentCheck.advanced.setup.shared_storage.label.dep_app_name':'Target Owning Component',
  'componentCheck.advanced.setup.shared_storage.label.dep_app_group':'App target component belongs',
  'componentCheck.advanced.setup.shared_storage.label.action':'Operation',
  'componentCheck.advanced.setup.mount_share_path.title':'Mount shared directory',
  'componentCheck.advanced.setup.mount_share_path.label.localpath':'Local mount path',
  'componentCheck.advanced.setup.mount_share_path.label.dep_vol_name':'Target Storage Name',
  'componentCheck.advanced.setup.mount_share_path.label.dep_vol_path':'Target Mount Path',
  'componentCheck.advanced.setup.mount_share_path.label.dep_vol_type':'Target Storage Type',
  'componentCheck.advanced.setup.mount_share_path.label.dep_app_name':'Target Owning Component',
  'componentCheck.advanced.setup.mount_share_path.label.dep_app_group':'App target component belongs',
  'componentCheck.advanced.setup.mount_share_path.msg.selectedRowKeys':'Select a directory to mount',
  'componentCheck.advanced.setup.mount_share_path.msg.local':'Check whether the local storage directory is specified',
  'componentCheck.advanced.setup.mount_share_path.msg.localPath':'Enter the local mount path',
  'componentCheck.advanced.setup.mount_share_path.msg.isMountPath':'The path is reserved for the system. Replace the path with another path',
  'componentCheck.advanced.setup.component_dependency.title':'Component dependency',
  'componentCheck.advanced.setup.component_dependency.table.service_cname':'Component Name',
  'componentCheck.advanced.setup.component_dependency.table.group_name':'Application',
  'componentCheck.advanced.setup.component_dependency.table.var':'Operation',
  'componentCheck.advanced.setup.component_dependency.table.btn.href':'View link information',
  'componentCheck.advanced.setup.component_dependency.table.btn.rely_on':'Cancel rely',
  'componentCheck.advanced.setup.depend_msg.title':'Viewing Dependency Information',
  'componentCheck.advanced.setup.depend_msg.table.attr_name':'Variable Name',
  'componentCheck.advanced.setup.depend_msg.table.attr_value':'Variable Value',
  'componentCheck.advanced.setup.depend_msg.table.name':'Notes',
  'componentCheck.advanced.setup.port_manage.title':'Port Management',
  'componentCheck.advanced.setup.environment_variable.title':'Environment Variable',
  'componentCheck.advanced.setup.port_manage.btn.null':'No Port',



}
const otherAppAssembly = {
  'otherApp.marketDrawer.edition':'Version:',
  'otherApp.marketDrawer.click':'Click Install',
  'otherApp.marketDrawer.not':'Not Installable',
  'otherApp.marketDrawer.Memory':'Memory:',
  'otherApp.marketDrawer.Select_version':'Select version',
  'otherApp.marketDrawer.input_version':'Select version',
  'otherApp.marketDrawer.more':'See more...',
  'otherApp.marketDrawer.creat':'Create component',
  'otherApp.marketDrawer.store':'Obtain cloud market authorization',

  // yaml上传
  'otherApp.UploadYaml.name_en':'Please enter the English name of the component',
  'otherApp.UploadYaml.only':'Only lowercase letters, numbers or "-" are supported, and must start with a letter, end with a number or a letter',
  'otherApp.UploadYaml.max':'Cannot be greater than 32 characters',
  'otherApp.UploadYaml.name':'App Name',
  'otherApp.UploadYaml.app':'Please select the application to which you want to belong',
  'otherApp.UploadYaml.up':'Upload file',
  'otherApp.UploadYaml.yaml':'Supports uploading files in yaml and YML formats',
  'otherApp.UploadYaml.placese_up':'Please upload the file',
  'otherApp.UploadYaml.creat':'Confirm creation',

  // jar上传
 'otherApp.UploadJarWar.name':'Component Name',
 'otherApp.UploadJarWar.input_name':'The component to be created does not have a name',
 'otherApp.UploadJarWar.max':'Maximum length: 24 bits',
 'otherApp.UploadJarWar.placese':'Please give the component you created a name',
 'otherApp.UploadJarWar.en_name':'English name',
 'otherApp.UploadJarWar.input_en_name':'Please enter the English name of the component',
 'otherApp.UploadJarWar.up':'Upload file',
 'otherApp.UploadJarWar.jar':'Support uploading files in jar and war formats',
 'otherApp.UploadJarWar.new':'New component',

 'otherApp.AppMoveGroup.title':'Modify the application to which the component belongs',
 'otherApp.AppMoveGroup.message':'Cannot be empty!',
}
const topology = {
  'topology.Topological.start':'Start',
  'topology.Topological.stop':'Stop',
  'topology.Topological.rolling':'Rolling',
  'topology.Topological.build':'Build',
  'topology.Topological.title':'Helpful hints',
  'topology.Topological.determine':'Determine',
  'topology.Topological.now':'Current component?',
  'topology.Topological.label':'Gateway',
  'topology.Topological.yes_or_no':'Whether to cancel',
  'topology.Topological.Rely_on':'Rely on',
  'topology.Topological.Shut_down':'Whether to shut down',
  'topology.Topological.all_port':'All external ports of a component',
  'topology.Topological.Did_not_open_port':'External ports are not enabled for components',
  'topology.Topological.associated':'To associate the',
  'topology.Topological.opne':'Internal ports are not enabled for components. Determine whether to enable them?',
  'topology.Topological.port':'Port',
  'topology.Topological.input_port':'Enter the port',
}
const JavaMaven = {
  'JavaMaven.Alert':'The following is the detected module information of the Maven multi-module project. Please select the module to be built and confirm the construction information',
  'JavaMaven.name':'Module name',
  'JavaMaven.cname':'Component name',
  'JavaMaven.packaging':'Package type',
  'JavaMaven.envs':'Build env info',
  'JavaMaven.OPTS':'Maven build Parameters',
  'JavaMaven.GOALS':'Maven build commands',
  'JavaMaven.startValue':'Start the command',
  'JavaMaven.index':'Port',
  'JavaMaven.id':'Operation',
  'JavaMaven.cname_input':'Enter the component command',
  'JavaMaven.bulid':'Build commands',
  'JavaMaven.bulid_input':'Enter the build command',
  'JavaMaven.start':'Start the command',
  'JavaMaven.start_input':'Enter the startup command',
  'JavaMaven.title':'JavaMaven Multi-module Settings',
  'JavaMaven.Tooltip':'Deselect this option to start without the build.',
}
const helmAppInstall = {
  //安装检测主页
  'helmAppInstall.index.delete':'The store has been deleted and cannot be updated.',
  'helmAppInstall.index.no':'The application template does not exist and cannot be updated',
  'helmAppInstall.index.input_config':'Please fill in the configuration item',
  'helmAppInstall.index.reinstall':'Reinstall',
  'helmAppInstall.index.up':'Upgrade',
  'helmAppInstall.index.install':'Install',
  'helmAppInstall.index.updata_info':'Version information is being updated, please wait patiently',
  'helmAppInstall.index.detection_failure':'App package verification failed',
  'helmAppInstall.index.detection_back':'Application package inspection failed, please exit and try again!',
  'helmAppInstall.index.install_failure':'Installation failed',
  'helmAppInstall.index.install_back':'Installation failed, please exit and try again!',
  'helmAppInstall.index.back':'Sign out',
  'helmAppInstall.index.detection_success':'Application package inspection succeeded',
  'helmAppInstall.index.detection_next':'The application package is verified successfully. Click Next to configure and install it.',
  'helmAppInstall.index.next':'Next step',
  'helmAppInstall.index.detecting':'Application package inspection in progress',
  'helmAppInstall.index.detecting_await':'The application package is being tested, please wait patiently....',
  'helmAppInstall.index.Being_reinstalled':'Reinstalling',
  'helmAppInstall.index.in_upgrade':'Upgrading',
  'helmAppInstall.index.in_install':'Installing',
  'helmAppInstall.index.need_time':'This may take some time, please be patient...',
  'helmAppInstall.index.key':'Keyword',
  'helmAppInstall.index.new':'Latest version',
  'helmAppInstall.index.now_version':'The current version is { lowVs }',
  // 升级页面
  'helmAppInstall.Upgrade.store':'Through the App Store（',
  'helmAppInstall.Upgrade.from':'）From Version',
  'helmAppInstall.Upgrade.to':'Upgrade to',
  'helmAppInstall.Upgrade.form_version':'From Version',
  'helmAppInstall.Upgrade.to_version':'Upgrade to',
  'helmAppInstall.Upgrade.no':'None',
  'helmAppInstall.Upgrade.reinstall':'Reinstall',
  'helmAppInstall.Upgrade.updat_info':'Upgrade Tips',
  'helmAppInstall.Upgrade.Continue':'Continue',
  'helmAppInstall.Upgrade.new':'New upgrade',
  'helmAppInstall.Upgrade.cancel':'Cancel',
  'helmAppInstall.Upgrade.model':'Application model',
  'helmAppInstall.Upgrade.again':'Some components of the last upgrade task were successfully updated. Continue to retry?',
  'helmAppInstall.Upgrade.failure':'The deployment of the last upgrade task failed. Continue to retry?',
  'helmAppInstall.Upgrade.unfinished':'There are unfinished upgrade tasks. Do you want to continue to complete the last task?',
  'helmAppInstall.Upgrade.back_info':'Rollback prompt',
  'helmAppInstall.Upgrade.down':'Close',
  'helmAppInstall.Upgrade.Rollback':'There are unfinished rollback tasks, and the upgrade cannot continue',
  'helmAppInstall.Upgrade.Rollback_confirm':'Rollback Confirmation',
  'helmAppInstall.Upgrade.rollback_confirm':'Are you sure you want to rollback?',
  'helmAppInstall.Upgrade.not_add':'The rollback process does not delete the new components.',
  // 升级信息展示页面
  'helmAppInstall.UpgradeInfo.add_com':'New components',
  'helmAppInstall.UpgradeInfo.change':'No component change',
  'helmAppInstall.UpgradeInfo.select':'Please select the version to upgrade',
  'helmAppInstall.UpgradeInfo.no_updatae':'No version to upgrade',
  'helmAppInstall.UpgradeInfo.add':'newly added',
  'helmAppInstall.UpgradeInfo.updata':'Update',
  'helmAppInstall.UpgradeInfo.remove':'Remove',
  'helmAppInstall.UpgradeInfo.survival':'Survival probe',
  'helmAppInstall.UpgradeInfo.ready':'Ready Probe',
  'helmAppInstall.UpgradeInfo.healthy':'Health detection',
  'helmAppInstall.UpgradeInfo.edition':'Source Component Build',
  'helmAppInstall.UpgradeInfo.from':'from',
  'helmAppInstall.UpgradeInfo.to':'Changed to',
  'helmAppInstall.UpgradeInfo.info':'Connection information',
  'helmAppInstall.UpgradeInfo.unit':'Plug-in unit',
  'helmAppInstall.UpgradeInfo.variable':'environment variable',
  'helmAppInstall.UpgradeInfo.port':'Port',
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
