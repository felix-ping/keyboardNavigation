//1.初始化数据

var hashA = init()
var key = hashA["key"]
var hash = hashA["hash"]
var lock = false


//2.遍历key 生成kbd标签及内部结构
generateKeyboard(key, hash)
function generateKeyboard(key, hash) {
    for (var index = 0; index < key.length; index++) {
        var div = tag('div', { className: 'row' })
        main.appendChild(div)
        var row = key[index]
        for (var index2 = 0; index2 < row.length; index2++) {
            var span = tag('span', { className: 'text' })
            span.textContent = row[index2]
            var button1 = tag('img', { id: row[index2],className: 'button' })
            button1.src='./img/edit.png'
            button1.onclick = function (xzkjcnxlkcjlk) {
                lock =true
                var button2 = xzkjcnxlkcjlk.target
                var img2 = button2.previousSibling
                var key2 = button2.id
                var x = prompt('给我个网址')
                if(x === null){return}
                hash[key2] = x
                img2.src = 'http://' + x + '/favicon.ico'
                img2.onerror = function (error) {
                    error.target.src = ''
                }
                localStorage.setItem('aa', JSON.stringify(hash))
                setTimeout(()=>lock=false,4)
            }

            var image = tag('img', { className: 'img' })
            if (hash[row[index2]]) {
                image.src = 'http://' + hash[row[index2]] + '/favicon.ico'
            } else {
                image.src = ''
            }
            image.onerror = function (error) {
                error.target.src = ''
            }
            var keyb = tag('kbd', { className: 'key',id: row[index2] })
            keyb.appendChild(span)
            keyb.appendChild(image)
            keyb.appendChild(button1)
            div.appendChild(keyb)
        }
    }
}

//3. 监听键盘
//鼠标点击事件//图标默认样式hover
listenToUser(hash)
function listenToUser(hash) {
    document.onkeypress = function (e) {
        var key1 = e.key
        var web = hash[key1]
        window.open('http://' + web, '_blank')
    }
    document.addEventListener('click',function(e){
        if(e.target.id){
            
            let key = e.target.id
            web = hash[key]
            
            if(web){
                web = web.trim()
                console.log(web)
                if(!lock){
                    window.open('http://' + web, '_blank')
                }
            }
        }
    })
}




function getFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name || 'null'))
}


function init() {
    var key = {
        //添加上数字键和源代码键
        '0': { 0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6', 6: '7', 7: '8', 8: '9', 9: '0',10:'$' ,length: 11 },
        '1': { 0: 'q', 1: 'w', 2: 'e', 3: 'r', 4: 't', 5: 'y', 6: 'u', 7: 'i', 8: 'o', 9: 'p', length: 10 },
        '2': { 0: 'a', 1: 's', 2: 'd', 3: 'f', 4: 'g', 5: 'h', 6: 'j', 7: 'k', 8: 'l', length: 9 },
        '3': { 0: 'z', 1: 'x', 2: 'c', 3: 'v', 4: 'b', 5: 'n', 6: 'm', length: 7 },
        length: 4
    }
    var hash = {
        'q': 'www.qq.com',
        'w': 'weibo.com',
        'e': 'ele.me',
        'r': 'sns.renren.com',
        't': 'taobao.com',
        'y': 'www.youku.com',
        'u': 'www.uc.cn',
        'i': 'www.iqiyi.com',
        'o': 'www.360.cn',
        'p': 'www.apple.com/cn',
        'a': 'amazon.com',
        's': 'souhu.com',
        'd': 'dangdang.com',
        'f': 'facebook.com',
        'g': 'google.com',
        'h': 'www.jd.com',
        'j': 'juejin.im',
        "k": 'www.tmall.com',
        'l': 'douban.com',
        'z': 'zhihu.com',
        'x': 'www.mi.com',
        'c': 'baidu.com',
        'v': 'cn.vuejs.org',
        'b': 'baidu.com',
        'n': 'souhu.com',
        'm': 'meituan.com'
    }
    var hashNew = getFromLocalStorage('aa')
    if (hashNew) {
        hash = hashNew
    }
    return {
        "key": key,
        "hash": hash


    }

}

function tag(tagName, attributes) {
    var element = document.createElement(tagName)
    for (var key in attributes) {
        element[key] = attributes[key] //key可以为className id textContent
    }
    return element
}