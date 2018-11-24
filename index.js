//1.初始化数据

var hashA = init()
var key = hashA["key"]
var hash = hashA["hash"]



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
            button1.src='./edit.png'
            button1.onclick = function (xzkjcnxlkcjlk) {
                var button2 = xzkjcnxlkcjlk.target
                var img2 = button2.previousSibling
                var key2 = button2.id
                var x = prompt('给我个网址')
                hash[key2] = x
                img2.src = 'http://' + x + '/favicon.ico'
                img2.onerror = function (error) {
                    error.target.src = ''
                }
                localStorage.setItem('aa', JSON.stringify(hash))
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
            window.open('http://' + web, '_blank')
        }
    })
}




function getFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name || 'null'))
}


function init() {
    var key = {
        //添加上数字键和源代码键
        '0': { 0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6', 6: '7', 7: '8', 8: '9', 9: '0', length: 10 },
        '1': { 0: 'q', 1: 'w', 2: 'e', 3: 'r', 4: 't', 5: 'y', 6: 'u', 7: 'i', 8: 'o', 9: 'p', length: 10 },
        '2': { 0: 'a', 1: 's', 2: 'd', 3: 'f', 4: 'g', 5: 'h', 6: 'j', 7: 'k', 8: 'l', length: 9 },
        '3': { 0: 'z', 1: 'x', 2: 'c', 3: 'v', 4: 'b', 5: 'n', 6: 'm', length: 7 },
        length: 4
    }
    var hash = {
        'q': 'qq.com',
        'w': 'weibo.com',
        'e': '',
        'r': 'renren.com',
        't': 'taobao.com',
        'y': 'youku.com',
        'u': '',
        'i': 'www.iqiyi.com',
        'o': '',
        'p': '',
        'a': 'amazon.com',
        's': 'souhu.com',
        'd': 'dangdang.com',
        'f': 'facebook.com',
        'g': 'google.com',
        'h': 'jd.com',
        'j': 'juejin.im',
        "k": 'tianmao.com',
        'l': 'douban.com',
        'z': 'zhihu.com',
        'x': 'xinlang.com',
        'c': 'baidu.com',
        'v': 'meituan.com',
        'b': '360.com',
        'n': 'souhu.com',
        'm': 'sogou.com'
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