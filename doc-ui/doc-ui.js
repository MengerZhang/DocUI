let docUIGlobalData = {
    onResizeChangeValue: {
        pageElement: [],
        messageBoxElement: []
    }
}

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.dui = factory())
})(this, (function () {

    /**
     * 遍历HTML中的所有元素
     */
    const child = document.children
    var elementList = []
    function each(obj) {
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].children) {
                each(obj[i].children)
            }
            // console.log(obj[i])
            elementList.push(obj[i])
        }
    }
    each(child)

    function attribute() {
        var attribute;
        var elementClass;
        for (let i = 0; i < elementList.length; i++) {
            const element = elementList[i];
            //是否存在round属性
            attribute = elementList[i].getAttribute('b:round')
            elementClass = elementList[i].getAttribute('class')
            if (attribute != undefined) {
                if (elementClass.includes('doc-button')) {
                    elementList[i].style.borderRadius = '14px'
                    // console.log('yeah')
                } else {
                    // console.log('qieeeeee')
                }
            }
            //是否存在radius属性
            attribute = elementList[i].getAttribute('b:radius')
            if (attribute != undefined) {
                elementList[i].style.borderRadius = attribute
            }
            //是否存在bgcolor属性
            attribute = elementList[i].getAttribute('b:color')
            if (attribute != undefined) {
                elementList[i].style.backgroundColor = attribute
            }
            //是否存在bgcolor属性
            attribute = elementList[i].getAttribute('b:text')
            if (attribute != undefined) {
                elementList[i].style.color = attribute
            }
            //是否存在border属性
            attribute = elementList[i].getAttribute('b:border')
            if (attribute != undefined) {
                elementList[i].style.border = attribute
            }
            //是否存在b:top属性
            attribute = elementList[i].getAttribute('b:top')
            if (attribute != undefined) {
                elementList[i].style.top = attribute
            }
            //是否存在b:left属性
            attribute = elementList[i].getAttribute('b:left')
            if (attribute != undefined) {
                elementList[i].style.left = attribute
            }
            //是否存在b:right属性
            attribute = elementList[i].getAttribute('b:right')
            if (attribute != undefined) {
                elementList[i].style.right = attribute
            }
            //是否存在b:bottom属性
            attribute = elementList[i].getAttribute('b:bottom')
            if (attribute != undefined) {
                elementList[i].style.bottom = attribute
            }
            //是否存在b:padding属性
            attribute = elementList[i].getAttribute('b:padding')
            if (attribute != undefined) {
                elementList[i].style.padding = attribute
            }
            //是否存在b:margin属性
            attribute = elementList[i].getAttribute('b:margin')
            if (attribute != undefined) {
                elementList[i].style.padding = attribute
            }
            //是否存在b:width属性
            attribute = elementList[i].getAttribute('b:width')
            if (attribute != undefined) {
                elementList[i].style.width = attribute
            }
            //是否存在b:height属性
            attribute = elementList[i].getAttribute('b:height')
            if (attribute != undefined) {
                elementList[i].style.height = attribute
            }
            //是否存在b:line-height属性
            attribute = elementList[i].getAttribute('b:line-height')
            if (attribute != undefined) {
                elementList[i].style.lineHeight = attribute
            }
            //是否存在class属性
            attribute = elementList[i].getAttribute('class')
            if (attribute != undefined) {
                if (attribute.includes('page') || attribute.includes('menu-list')) {
                    elementList[i].style.margin = '0px 0px 0px calc((100vw - ' + elementList[i].offsetWidth + 'px' + ') / 2)'
                    docUIGlobalData.onResizeChangeValue.pageElement.push(elementList[i])
                } else if (attribute.includes('doc-message-box')) {
                    elementList[i].style.top = 'calc((100vh - ' + elementList[i].offsetHeight + 'px' + ') / 2)'
                    elementList[i].style.left = 'calc((100vw - ' + elementList[i].offsetWidth + 'px' + ') / 2)'
                    docUIGlobalData.onResizeChangeValue.messageBoxElement.push(elementList[i])
                    for (let j = 0; j < elementList[i].children.length; j++) {
                        const element = elementList[i].children[j];
                        attribute = element.getAttribute('class')
                        if (attribute && attribute == 'cover') {
                            element.onclick = function () {
                                docHideMessageBox({el: elementList[i]})
                            }
                        }
                    }
                }
            }


            //栅格系统
            // attribute = elementList[i].getAttribute('c:1')
            // if (attribute != undefined) {
            //     elementList[i].style.padding = '0px'
            //     elementList[i].style.textAlign = 'center'
            //     elementList[i].style.width = 'calc(100% - 12px)'
            //     elementList[i].style.margin = '5px 0px 0px 5px'
            // }
            //栅格系统
            attribute = elementList[i].getAttribute('col')
            if (attribute != undefined && attribute.includes('-')) {
                var column = attribute.split('-')
                if (column[1] > 12) {
                    console.log('警告: 栅格系统尽量不要超过12列')
                }
                elementNumberInThisRow = elementList[i].parentNode.children.length
                elementList[i].style.float = 'left'
                elementList[i].style.padding = '0px'
                elementList[i].style.textAlign = 'center'
                elementList[i].style.width = 'calc((100% - ' + (5 * (elementNumberInThisRow + 1) + 2 * elementNumberInThisRow) + 'px' + ') / ' + column[1] + ' * ' + column[0] + ')'
                elementList[i].style.margin = '5px 0px 0px 5px'
            } else if (attribute != undefined && !attribute.includes('-')) {
                elementList[i].style.float = 'left'
                elementList[i].style.padding = '0px'
                elementList[i].style.textAlign = 'center'
                elementList[i].style.width = 'calc(100% - 12px)'
                elementList[i].style.margin = '5px 0px 0px 5px'
            }
        }
    }
    attribute()
}));

// function observe(obj, vm) {
//     Object.keys(obj).forEach(function (key) {
//         defineReactive(vm, key, obj[key]);
//     });
// }


// function defineReactive(obj, key, val) {

//     var dep = new Dep();

//     // 响应式的数据绑定
//     Object.defineProperty(obj, key, {
//         get: function () {
//             // 添加订阅者watcher到主题对象Dep
//             if (Dep.target) {
//                 dep.addSub(Dep.target);
//             }
//             return val;
//         },
//         set: function (newVal) {
//             if (newVal === val) {
//                 return; 
//             } else {
//                 val = newVal;
//                 // 作为发布者发出通知
//                 dep.notify()
//             }
//         }
//     });
// }

// function nodeToFragment(node, vm) {
//     var flag = document.createDocumentFragment();
//     var child;

//     while (child = node.firstChild) {
//         compile(child, vm);
//         flag.appendChild(child); // 将子节点劫持到文档片段中
//     }
    
//     return flag;
// }

// function compile(node, vm) {
//     var reg = /\{\{(.*)\}\}/;

//     // 节点类型为元素
//     if (node.nodeType === 1) {
//         var attr = node.attributes;
//         // 解析属性
//         for (var i = 0; i < attr.length; i++) {
//             if (attr[i].nodeName == 'v-model') {
//                 var name = attr[i].nodeValue; // 获取v-model绑定的属性名
//                 node.addEventListener('input', function (e) {
//                     // 给相应的data属性赋值，进而触发属性的set方法
//                     vm[name] = e.target.value;
//                 })
//                 node.value = vm[name]; // 将data的值赋值给该node
//                 node.removeAttribute('v-model');
//             }
//         }
//     }

//     // 节点类型为text
//     if (node.nodeType === 3) {
//         if (reg.test(node.nodeValue)) {
//             var name = RegExp.$1; // 获取匹配到的字符串
//             name = name.trim();
//             // node.nodeValue = vm[name]; // 将data的值赋值给该node

//             new Watcher(vm, node, name);
//         }
//     }
// }

// function Watcher(vm, node, name) {
//     Dep.target = this;
//     this.name = name;
//     this.node = node;
//     this.vm = vm;
//     this.update();
//     Dep.target = null;
// }

// Watcher.prototype = {
//     update: function () {
//         this.get();
//         this.node.nodeValue = this.value;
//     },

//     // 获取data中的属性值
//     get: function () {
//         this.value = this.vm[this.name]; // 触发相应属性的get
//     }
// }

// function Dep () {
//     this.subs = [];
// }

// Dep.prototype = {
//     addSub: function (sub) {
//         this.subs.push(sub);
//     },

//     notify: function () {
//         this.subs.forEach(function (sub) {
//             sub.update();
//         });
//     }
// }

// function Doc(options) {
//     this.data = options.data;
//     var data = this.data;

//     observe(data, this);

//     var id = options.el;
//     var dom = nodeToFragment(document.getElementById(id), this);
//     // 编译完成后，将dom返回到app中。
//     document.getElementById(id).appendChild(dom);
// }



function observe(obj, vm) {
    Object.keys(obj).forEach(function (key) {
        defineReactive(vm, key, obj[key]);
    });
}


function defineReactive(obj, key, val) {

    var dep = new Dep();

    // 响应式的数据绑定
    Object.defineProperty(obj, key, {
        get: function () {
            // 添加订阅者watcher到主题对象Dep
            if (Dep.target) {
                dep.addSub(Dep.target);
            }
            return val;
        },
        set: function (newVal) {
            if (newVal === val) {
                return;
            } else {
                val = newVal;
                // 作为发布者发出通知
                dep.notify()
            }
        }
    });
}

function nodeToFragment(node, vm) {
    var flag = document.createDocumentFragment();
    var child;

    while (child = node.firstChild) {
        compile(child, vm);
        flag.appendChild(child); // 将子节点劫持到文档片段中
    }
    
    return flag;
}

function compile(node, vm) {
    var reg = /\{\{(.*)\}\}/;

    // 节点类型为元素
    if (node.nodeType === 1) {
        var attr = node.attributes;
        var text = '';
        // 解析属性
        for (var i = 0; i < attr.length; i++) {
            if (attr[i].nodeName == 'v-model') {
                var name = attr[i].nodeValue; // 获取v-model绑定的属性名
                node.addEventListener('input', function (e) {
                    // 给相应的data属性赋值，进而触发属性的set方法
                    vm[name] = e.target.value;
                })
                node.value = vm[name]; // 将data的值赋值给该node
                node.removeAttribute('v-model');
            } else if (attr[i].nodeName == 'db') {
                var name = attr[i].nodeValue; // 获取v-model绑定的属性名
                node[name] = vm.text;
                console.log(vm.text)
                // node.value = vm[text]; // 将data的值赋值给该node
                node.removeAttribute('db');
            }
        }
    }

    // 节点类型为text
    if (node.nodeType === 3) {
        if (reg.test(node.nodeValue)) {
            var name = RegExp.$1; // 获取匹配到的字符串
            name = name.trim();
            // node.nodeValue = vm[name]; // 将data的值赋值给该node

            new Watcher(vm, node, name);
        }
    }
}

function Watcher(vm, node, name) {
    Dep.target = this;
    this.name = name;
    this.node = node;
    this.vm = vm;
    this.update();
    Dep.target = null;
}

Watcher.prototype = {
    update: function () {
        this.get();
        this.node.nodeValue = this.value;
        this.node
    },

    // 获取data中的属性值
    get: function () {
        this.value = this.vm[this.name]; // 触发相应属性的get
    }
}

function Dep () {
    this.subs = [];
}

Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub);
    },

    notify: function () {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    }
}

function Doc(options) {
    this.data = options.data;
    var data = this.data;

    observe(data, this);

    var id = options.el;
    var dom = nodeToFragment(document.getElementById(id), this);
    // 编译完成后，将dom返回到app中。
    document.getElementById(id).appendChild(dom);
}



window.onresize = (function () {
    //重置元素边距
    docResetPageElementMargin()
})
//重置元素边距
function docResetPageElementMargin() {
    for (let i = 0; i < docUIGlobalData.onResizeChangeValue.pageElement.length; i++) {
        const element = docUIGlobalData.onResizeChangeValue.pageElement[i];
        element.style.margin = '0px 0px 0px calc((100vw - ' + element.offsetWidth + 'px' + ') / 2)'
        console.log(element.style.position)
    }
}
function docResetMessageBoxElementMargin() {
    for (let i = 0; i < docUIGlobalData.onResizeChangeValue.messageBoxElement.length; i++) {
        const element = docUIGlobalData.onResizeChangeValue.messageBoxElement[i];
        elementList[i].style.top = 'calc((100vh - ' + elementList[i].offsetHeight + 'px' + ') / 2)'
        elementList[i].style.left = 'calc((100vw - ' + elementList[i].offsetWidth + 'px' + ') / 2)'
        console.log(element.style.position)
    }
}
function docShowMessageBox(options) {
    this.el = query(options.el)
    this.el.style.visibility = "visible"
    this.el.style.opacity = "1"
}
function docHideMessageBox(options) {
    this.el = query(options.el)
    this.el.style.visibility = "hidden"
    this.el.style.opacity = "0"
}
function query (el) {
    if (typeof el === 'string') {
        var selected = document.querySelector(el);
        if (!selected) {
        console.log('Cannot find element: ' + el);
        return document.createElement('div')
        }
        return selected
    } else {
        return el
    }
}