#!/bin/bash
osstool="ossutil64"

osstool_install() {
    if [ ! -f ${osstool} ]; then
        echo "installing ossutil binary"
        if [ "$os" == "Darwin" ]; then
            wget http://gosspublic.alicdn.com/ossutil/1.6.14/ossutilmac64 -O ${osstool}
        else
            wget http://gosspublic.alicdn.com/ossutil/1.6.3/ossutil64 -O ${osstool}
        fi
        cat >~/.ossutilconfig <<EOF
[Credentials]
language=CH
endpoint=http://oss-cn-shanghai.aliyuncs.com
accessKeyID=${CDN_ACCESS_KEY_ID}
accessKeySecret=${CDN_ACCESS_KEY_SECRET}
EOF
    fi
}

if [ "${ENABLE_CDN}" == 'true' ]; then
    echo "Upload static file to oss"
    osstool_install
    now_day=$(date '+%Y-%m-%d')
    ${osstool} mkdir "oss://grstatic/rainbond-cloud/publish/${now_day}/"
    ${osstool} cp -u -r dist/ "oss://grstatic/rainbond-cloud/publish/${now_day}/"
fi
