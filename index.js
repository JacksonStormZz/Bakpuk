var product = [{
    id: 1,
    img: 'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/492235189_122153336216543947_8853667336589421896_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Xjp7CLwfifoQ7kNvwGS5aNm&_nc_oc=Adn3jzAJFfR564LOAtlMYcbMbaakXQ_RsK6_DOcqSsGJnhhLqGIHFTBIKbrRtFkm9mGUzDMipsIA0OF8NqsSv688&_nc_zt=23&_nc_ht=scontent.fkkc3-1.fna&_nc_gid=R8Hw1MB5VZdGrI0eL2icRg&oh=00_AfcCaWQ5Zl7Dihnh4L6xkjqKgkHF-R5cuYy6IH3IuvoH2A&oe=68F3F72E',
    name: 'Nashville Hot Chicken',
    price: 69,
    description: 'yuumy',
    type: 'chicken'
}, {
    id: 2,
    img: 'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/475461889_122135832356543947_6736248945548261388_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=KxZlUX6QH5IQ7kNvwEHyxJU&_nc_oc=AdkZ9LXYPL1_C_QwpQWljJ_0Cy2LeN3QdrrU1CkBvo7TocydleVjHVzl_DvFNai8TNug7bovgREGuiLF5Ox72VCK&_nc_zt=23&_nc_ht=scontent.fkkc3-1.fna&_nc_gid=H2-_LIm0gpZ1tLZLzyrQeA&oh=00_Afea-AvAibJWVl7bce06kpVklsUYfFKC1RDulNkebZQ9Yw&oe=68F3FF88',
    name: 'Chicken Wrap',
    price: 50,
    description: 'ymumy',
    type: 'wrap'
}, {
   id: 3,
   img: 'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/480486545_122139171728543947_2342050265841889652_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=1kvl7gurLbsQ7kNvwFZCUxa&_nc_oc=AdkJDiMVh7t6K3QSgbaoRC1ojKrmtQBi1nnQ3nvPRAm5MPKpfQjO3uBqeuko5yTo2GGNYWFWDzoT4Uam8y5ZcbFW&_nc_zt=23&_nc_ht=scontent.fkkc3-1.fna&_nc_gid=r_nKv2V1meGCYYDr6V33_g&oh=00_AfcD018vxGgfz_VoYXi48IFAw1wcR0i2j_leytJBJSTLSw&oe=68F3FF76',
    name: 'Pizza roll',
    price: 60,
    description: 'yummy',
    type: 'wrap'
}, {
    id: 4,
    img: 'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/495155372_122156483534543947_3101379461614384793_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=fWf95jJWIOcQ7kNvwEGgQCQ&_nc_oc=AdlAE4LiM0Stn3A9vtH6h_K7J9YQ2vuVgR3Vxev6hsqGpHMZiUu1v21XDSi7nNsC0iuRb-cHlhutUg4k24FDvh14&_nc_zt=23&_nc_ht=scontent.fkkc3-1.fna&_nc_gid=iHl0LH0j9VOZsuLbAXq5kQ&oh=00_AfeJlzi93Y0awiMcRZsIWDN8k0RUq6H5Nl0IPylryYaviw&oe=68F3FCFA',
    name: 'Fried Chicken fish sauce',
    price: 50,
   description: 'yummy',
    type: 'chicken'
}];

// [{},{},{}] // length = 3
var product;

$(document).ready(() => { 
    $.ajax({
        method:'get',
        url:'./api/getallproduct.php',
        success: function(response) {
            console.log(response)
            if(response.RespCode== 200){
                product = response.Result;
                 var html = '';
                    for (let i = 0; i < product.length; i++) {
                        html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}">
                                    <img class="product-img" src="${product[i].img}" alt="">
                                    <p style="font-size: 1.2vw;">${product[i].name}</p>
                                    <p stlye="font-size: 1vw;">${ numberWithCommas(product[i].price) } THB</p>
                                </div>`;
                    }
    $("#productlist").html(html);
            }
        },error: function(err) {
            console.log(err)
        }
    })
    var html = '';
    for (let i = 0; i < product.length; i++) {
        html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}">
                    <img class="product-img" src="${product[i].img}" alt="">
                    <p style="font-size: 1.2vw;">${product[i].name}</p>
                    <p stlye="font-size: 1vw;">${ numberWithCommas(product[i].price) } THB</p>
                </div>`;
    }
    $("#productlist").html(html);

})

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function searchsomething(elem) {
    // console.log('#'+elem.id)
    var value = $('#'+elem.id).val()
    console.log(value)

    var html = '';
    for (let i = 0; i < product.length; i++) {
        if( product[i].name.includes(value) ) {
            html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}">
                    <img class="product-img" src="${product[i].img}" alt="">
                    <p style="font-size: 1.2vw;">${product[i].name}</p>
                    <p stlye="font-size: 1vw;">${ numberWithCommas(product[i].price) } THB</p>
                </div>`;
        }
    }
    if(html == '') {
        $("#productlist").html(`<p>Not found product</p>`);
    } else {
        $("#productlist").html(html);
    }

}

function searchproduct(param) {
    console.log(param)
    $(".product-items").css('display', 'none')
    if(param == 'all') {
        $(".product-items").css('display', 'block')
    }
    else {
        $("."+param).css('display', 'block')
    }
}

var productindex = 0;
function openProductDetail(index) {
    productindex = index;
    console.log(productindex)
    $("#modalDesc").css('display', 'flex')
    $("#mdd-img").attr('src', product[index].img);
    $("#mdd-name").text(product[index].name)
    $("#mdd-price").text( numberWithCommas(product[index].price) + ' THB')
    $("#mdd-desc").text(product[index].description)
}

function closeModal() {
    $(".modal").css('display','none')
}

var cart = [];
function addtocart() {
    var pass = true;

    for (let i = 0; i < cart.length; i++) {
        if( productindex == cart[i].index ) {
            console.log('found same product')
            cart[i].count++;
            pass = false;
        }
    }

    if(pass) {
        var obj = {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].name,
            price: product[productindex].price,
            img: product[productindex].img,
            count: 1
        };
        // console.log(obj)
        cart.push(obj)
    }
    console.log(cart)

    Swal.fire({
        icon: 'success',
        title: 'Add ' + product[productindex].name + ' to cart !'
    })
    $("#cartcount").css('display','flex').text(cart.length)
}

function openCart() {
    $('#modalCart').css('display','flex')
    rendercart();
}

function rendercart() {
    if(cart.length > 0) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `<div class="cartlist-items">
                        <div class="cartlist-left">
                            <img src="${cart[i].img}" alt="">
                            <div class="cartlist-detail">
                                <p style="font-size: 1.5vw;">${cart[i].name}</p>
                                <p style="font-size: 1.2vw;">${ numberWithCommas(cart[i].price * cart[i].count) } THB</p>
                            </div>
                        </div>
                        <div class="cartlist-right">
                            <p onclick="deinitems('-', ${i})" class="btnc">-</p>
                            <p id="countitems${i}" style="margin: 0 20px;">${cart[i].count}</p>
                            <p onclick="deinitems('+', ${i})" class="btnc">+</p>
                        </div>
                    </div>`;
        }
        $("#mycart").html(html)
    }
    else {
        $("#mycart").html(`<p>Not found product list</p>`)
    }
}

function deinitems(action, index) {
    if(action == '-') {
        if(cart[index].count > 0) {
            cart[index].count--;
            $("#countitems"+index).text(cart[index].count)

            if(cart[index].count <= 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure to delete?',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel'
                }).then((res) => {
                  if(res.isConfirmed) {
                     cart.splice(index, 1) 
                     console.log(cart)
                     rendercart();
                     $("#cartcount").css('display','flex').text(cart.length)
                     
                     if(cart.length <= 0) {
                        $("#cartcount").css('display','none')
                     }
                  }  
                  else {
                    cart[index].count++;
                    $("#countitems"+index).text(cart[index].count)
                    rendercart();
                  }
                })
            }
            rendercart();
        }
        
    }
    else if(action == '+') {
        cart[index].count++;
        $("#countitems"+index).text(cart[index].count)
        rendercart();
    }
}
// เพิ่มฟังก์ชันนี้ในไฟล์ index.js
function checkout() {
    if (cart.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'ตะกร้าว่างเปล่า!',
        });
        return;
    }

    // ในระบบจริง คุณต้องมี Modal/Form ให้ลูกค้ากรอกชื่อ ที่อยู่ เบอร์โทรศัพท์ ก่อน
    // ส่วนนี้คือการจำลองการส่งข้อมูลในตัวแปร 'cart' ไปยัง Backend
    
    var orderData = {
        // อาจจะต้องเพิ่มข้อมูลลูกค้า เช่น name: 'John Doe', address: '123 Main St'
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.count), 0),
    };

    // ส่งข้อมูลไปบันทึกที่ Backend (ต้องสร้างไฟล์ checkout.php ใน Backend)
    $.ajax({
        method: 'post',
        url: './api/checkout.php',
        data: orderData,
        success: function(response) {
            // สมมติว่า Backend ตอบกลับว่าสำเร็จ
            Swal.fire({
                icon: 'success',
                title: 'สั่งซื้อสำเร็จ!',
                text: 'รายการสั่งซื้อของคุณถูกส่งไปยังห้องครัวแล้ว',
                showConfirmButton: false,
                timer: 2000
            });
            // ล้างตะกร้าและอัปเดต UI
            cart = [];
            closeModal();
            $("#cartcount").css('display','none');
            rendercart(); 
        },
        error: function(err) {
            Swal.fire({
                icon: 'error',
                title: 'สั่งซื้อล้มเหลว',
                text: 'ไม่สามารถทำรายการสั่งซื้อได้',
            });
            console.log(err);
        }
    });
}
