const root = document.querySelector('#root');

function link(label,path){
    const a = document.createElement('a');
    const textA = document.createTextNode(label);
    a.appendChild(textA);
    a.href=path;
    a.addEventListener('click',(e)=>{
        e.preventDefault();
        history.pushState({},textA,path);
        root.dispatchEvent(new Event('rerender'));
    });
    return a;

}

function Page1(){
    const h1 = document.createElement('h1');
    const text = document.createTextNode('Page 1');
    h1.appendChild(text);
    h1.appendChild(link('Page 2','/page2'));
    h1.appendChild(link('Page 3','/page3'));

    const h2 = document.createElement('h2');
    const title = document.createTextNode("Vous êtes sur la page 1")
    h2.appendChild(title);
    h1.appendChild(h2);

    return h1
}

function Page2() {
    const h1 = document.createElement('h1');
    const text = document.createTextNode('Page 2');
    h1.appendChild(text);
    h1.appendChild(link('Page 1','/page1'));
    h1.appendChild(link('Page 3','/page3'));

    const h2 = document.createElement('h2');
    const title = document.createTextNode("Vous êtes sur la page 2")
    h2.appendChild(title);
    h1.appendChild(h2);

    return h1;
}

function Page3() {
    const h1 = document.createElement('h1');

    const text = document.createTextNode('Page 3');
    h1.appendChild(text);
    h1.appendChild(link('Page 1','/page1'));
    h1.appendChild(link('Page 2','/page2'));

    const h2 = document.createElement('h2');
    const title = document.createTextNode("Vous êtes sur la page 3")
    h2.appendChild(title);
    h1.appendChild(h2);

    return h1;
}

function generatePage(){

    const currentPath = window.location.pathname;
    let elem;
    switch(currentPath){
        case '/':
            elem = Page1();
            break;
        case '/page1':
            elem = Page1();
            break;
        case '/page2':
            elem = Page2();
            break;
        case '/page3':
            elem = Page3();
            break;
    }
    if(root.childNodes.length){
        root.replaceChild(elem,root.firstChild)
    }else{
        root.appendChild(elem);// Appeler toujours l'element du DOM en dernier pour le painting
    }
}

root.addEventListener("rerender",generatePage);

window.onpopstate = ()=> root.dispatchEvent(new Event('rerender'));

root.dispatchEvent(new Event('rerender')); // = generatePage();