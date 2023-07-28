import JSEncrypt from 'jsencrypt'
//综合运维
const rsaPubkey =
    '-----BEGIN PUBLIC KEY-----' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDc+JU7uCf/XjBNm4TM6N3SaWIB' +
    'SCHGsKU55+bcxbv0Vaid1xA+XGtGkzLJFlBOnXbgXvOQUynL2ICY3/yLpu1NEseQ' +
    'n+qB3kTQG3O633Q+OjzvBgT2tRT4E+WR0cWbjYpLZsftkuMxeD4Ik7H45IdgsYJu' +
    '3rDEEKuSMy25DCkVJwIDAQAB' +
    '-----END PUBLIC KEY-----'

//运维平台
const octPubkey =
    '-----BEGIN PUBLIC KEY-----' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfjzE7sOYIOmBLKS9yRm2BjkE3' +
    'IkJh6+rvlW5Z+lzfG3oPsPmfSeUvZID8R/LW1sUksCAHs3p4u5UrE5dV6K/MDeyo' +
    'g1hS89HM54+zXtecEIse+2W1W5EeDVUgwPvT9lcCt6yDDXE52s6K/RLwDU0pvFPR' +
    'M5wylnAAxXAfKAexpQIDAQAB' +
    '-----END PUBLIC KEY-----'

export function rsaEncrypt(data: string, isOct: boolean = false) {
    let url = ''
    let secuityKey = ''
    let str =
        '{"timestamp":"' +
        Math.floor(new Date().getTime() / 1000) +
        '","secuityKey":"' +
        secuityKey +
        '","url":"' +
        url +
        '","data":"' +
        data +
        '"}'
    let encrypt = new JSEncrypt()
    if (isOct) {
        encrypt.setPublicKey(octPubkey)
    } else {
        encrypt.setPublicKey(rsaPubkey)
    }

    let encrypted = encrypt.encrypt(str)

    return encrypted
}
