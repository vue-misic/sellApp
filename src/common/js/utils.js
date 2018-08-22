/**
 * 获取Url参数
 * @example ?id=12345&a=b
 * @result {id: 12345, a: b}
 */
export  function parseUrl () {
    let url = window.location.search,
        obj = {},
        reg = /[?&][^?&]+=[^?&]+/g,
        arr = url.match(reg);
        //['?id=12345','&a=b']
        if(arr) {
            //url中的参数需要做decode
            arr.forEach((item) => {
                let tempA = item.substring(1).split('=');
                let key = decodeURIComponent(tempA[0]),
                    value = decodeURIComponent(tempA[1]);
                    console.log(tempA)
                    obj[key] = value
            })
            return obj;
        }
        

}