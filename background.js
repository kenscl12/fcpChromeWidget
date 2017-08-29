function getSearchUrl(url) {
    var baseUrl = "http://findclickprice.ru?url=";

    return baseUrl + url;
}

function getElementCssStyle(elemTop, elemLeft) {
    var css = "position: fixed; z-index: 9999999; height: 45px; width: 45px; background-size: cover; background-position: center center";
    css += "background-repeat: no-repeat; font-size: 14px; cursor: pointer; text-align: center; line-height: 45px; border-radius: 6px; cursor: pointer; color: rgb(255, 255, 255); transition: opacity 0.4s;";
    
    var top = elemTop + 15;

    css += "top: " + top + "px;";

    var left = elemLeft + 15;

    css += "left: " + left + "px;";

    return css;
}

function imageMouseOverEvent(img) {
    //console.log(img.src);
    if (document.getElementById("findclick_"))
        return;

    var currentImage = img.currentTarget;



    var currentImageHtml = currentImage.outerHTML;

    //var currentImageWrap = "<div class='imageWrap'>" + currentImageHtml + "<a target='_blank' href='" + getSearchUrl(currentImage.src) + "'>ссылка</a></div>";
    //currentImage.outerHTML = currentImageWrap;
    var style = getElementCssStyle(currentImage.offsetTop, currentImage.offsetLeft);
    var link = "<a href='" + getSearchUrl(currentImage.src) +  "' id='findclick_' target='_blank' style='" + style + "'><img src='" + currentImage.src + "' width=45 height=45</a>";

    document.body.innerHTML = document.body.innerHTML + link;
    imageAddEvent();
}

function imageMouseOutEvent(img) {
    var currentImageEffect = document.getElementById("findclick_");

    if (!currentImageEffect)
        return;

    currentImageEffect.parentNode.removeChild(currentImageEffect);
}
   
function imageAddEvent() {
    console.log('document is ready. I can sleep now');
    var imgs = document.images;
    for(img in imgs){
        if(imgs.hasOwnProperty(img)){
            imgs[img].addEventListener("mouseover", imageMouseOverEvent);
            imgs[img].addEventListener("mouseout", imageMouseOutEvent);
        }
    }
    

    // for (var i = 0; i < imgs.length; i++) {
    //     imgs[i].addEventListener("mouseover", function() {
    //         console.log(this.src);
    //         //if (document.getElementById("findclick_"))
    //             //document.body.removeChild("findclick_");

    //         var currentImage = this;



    //         var currentImageHtml = currentImage.outerHTML;

    //         //var currentImageWrap = "<div class='imageWrap'>" + currentImageHtml + "<a target='_blank' href='" + getSearchUrl(currentImage.src) + "'>ссылка</a></div>";
    //         //currentImage.outerHTML = currentImageWrap;
    //         var style = getElementCssStyle(currentImage.offsetTop, currentImage.offsetLeft);
    //         var link = "<a href='" + getSearchUrl(currentImage.src) +  "' id='findclick_' target='_blank' style='" + style + "'><img src='" + currentImage.src + "' width=45 height=45</a>";

    //         document.body.innerHTML = document.body.innerHTML + link;
    //         //var link = "<a href='" + currentImage.src +  "' id=''>Ссылка</a>";

    //         //currentImage.parentNode.insertBefore(link, currentImage.nextSibling);
    //     });
    // }
}

window.onload = imageAddEvent;