export default [
    {
        url: '/api/getMenu',
        type: 'get',
        response: () => {
            return {
                "status": "SUCCESS",
                "msg": "SUCCESS",
                "data": {
                    "topMenuId": "02",
                    "childMenu": {
                        "03": [
                            {
                                "id": "03-01",
                                "name": "地图组件",
                                "pid": "03",
                                "urlpattern": "/map",
                                "sort": null,
                                "isleaf": "1",
                                "icon": "",
                                "checked": false,
                                "open": true
                            },
                            {
                                "id": "03-02",
                                "name": "树形组件",
                                "pid": "03",
                                "urlpattern": "/lineTree",
                                "sort": null,
                                "isleaf": "1",
                                "icon": "",
                                "checked": false,
                                "open": true
                            },
                            {
                                "id": "03-05",
                                "name": "树形选择器",
                                "pid": "03",
                                "urlpattern": "/lineTreeSelect",
                                "sort": null,
                                "isleaf": "1",
                                "icon": "",
                                "checked": false,
                                "open": true
                            }
                        ],
                    },
                    "topMenu": [
                        {
                            "id": "02",
                            "name": "首页",
                            "pid": "",
                            "urlpattern": "/home",
                            "sort": null,
                            "isleaf": "1",
                            "icon": "maintain_icon",
                            "checked": false,
                            "open": true
                        },
                        {
                            "id": "03",
                            "name": "组件",
                            "pid": "",
                            "urlpattern": "/components",
                            "sort": null,
                            "isleaf": "1",
                            "icon": "cmdb_icon",
                            "checked": false,
                            "open": true
                        },
                    ],
                    "menuUrlpattern": "/maintain"
                }
            }
        },
    },
]
