// รหัสผ่านสำหรับเข้าสู่ระบบ (คุณสามารถเปลี่ยนได้)
const ADMIN_PASSWORD = "admin123";

// ข้อมูลจำลองรายการสั่งซื้อ (Simulated Order Data)
let simulatedOrders = [ 
    {
        order_id: 1001,
        
        order_date: "2025-10-18 17:30",
        total_price: 119,
        status: "Pending",
        items: [
            { name: "Nashville Hot Chicken", quantity: 1, price: 69 },
            { name: "Chicken Wrap", quantity: 1, price: 50 }
        ]
    }
];

// ฟังก์ชันสำหรับใส่ comma ในตัวเลข
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

// ฟังก์ชันแสดงรายการสั่งซื้อทั้งหมด (ไม่เปลี่ยนแปลง)
function renderOrders(orders) {
    if (orders.length === 0) {
        $("#orders-container").html("<p>ไม่มีรายการสั่งซื้อในระบบ</p>");
        return;
    }
    
    let html = '<table>';
    // ลบคอลัมน์ชื่อลูกค้าออกตามที่คุณต้องการ
    html += '<thead><tr><th>Order ID</th><th>ราคารวม (THB)</th><th>สถานะ</th><th>วันที่สั่ง</th><th>รายละเอียด</th><th>Status Update</th></tr></thead>'; 
    html += '<tbody>';

    orders.forEach(order => {
        let statusButton = '';
        if (order.status !== 'Completed') {
            statusButton = `<button class="status-done-btn" onclick="markOrderCompleted(${order.order_id})">Done</button>`;
        } else {
            statusButton = `✅ Done`;
        }

        html += `<tr>
                    <td>${order.order_id}</td>
                    <td>${numberWithCommas(order.total_price)}</td>
                    <td>${order.status}</td>
                    <td>${order.order_date}</td>
                    <td><button class="details-btn" onclick="showOrderDetail(${order.order_id})">ดูรายละเอียด</button></td>
                    <td>${statusButton}</td>
                 </tr>`;
    });

    html += '</tbody></table>';
    $("#orders-container").html(html);
}

// ฟังก์ชันสำหรับเปลี่ยนสถานะเป็น Completed (ไม่เปลี่ยนแปลง)
function markOrderCompleted(orderId) {
    const orderIndex = simulatedOrders.findIndex(o => o.order_id === orderId);

    if (orderIndex === -1) {
        Swal.fire('Error', 'ไม่พบ Order ID นี้', 'error');
        return;
    }

    simulatedOrders[orderIndex].status = 'Completed';
    
    Swal.fire({
        icon: 'success',
        title: 'อัปเดตสถานะสำเร็จ!',
        text: `Order ID ${orderId} ถูกทำเครื่องหมายว่าเสร็จสิ้นแล้ว`,
        showConfirmButton: false,
        timer: 1500
    });
    
    renderOrders(simulatedOrders);
}

// ฟังก์ชันแสดงรายละเอียดสินค้าในแต่ละออเดอร์ (ไม่เปลี่ยนแปลง)
function showOrderDetail(orderId) {
    const order = simulatedOrders.find(o => o.order_id === orderId);

    if (!order) {
        Swal.fire('Error', 'ไม่พบ Order ID นี้', 'error');
        return;
    }

    let itemsHtml = order.items.map(item => 
        `<li>${item.name} (${item.quantity} x ${numberWithCommas(item.price)} THB) = ${numberWithCommas(item.quantity * item.price)} THB</li>`
    ).join('');

    Swal.fire({
        title: `รายละเอียด Order ID: ${order.order_id} (${order.status})`,
        html: `
            <p><strong>ลูกค้า:</strong> ${order.customer_name || 'N/A'}</p>
            <p><strong>ที่อยู่:</strong> ${order.customer_address}</p>
            <hr>
            <p><strong>รายการสินค้า:</strong></p>
            <ul>${itemsHtml}</ul>
            <hr>
            <h3>รวมทั้งหมด: ${numberWithCommas(order.total_price)} THB</h3>
        `,
        width: 600,
        padding: '2em',
        confirmButtonText: 'ปิด'
    });
}

// *** ฟังก์ชันใหม่: ตรวจสอบรหัสผ่านก่อนเข้าถึง ***
function checkAdminAccess() {
    Swal.fire({
        title: 'Admin Login',
        input: 'password',
        inputLabel: 'ใส่รหัสผ่านผู้ดูแลระบบ',
        inputPlaceholder: 'รหัสผ่าน',
        confirmButtonText: 'เข้าสู่ระบบ',
        showCancelButton: true,
        allowOutsideClick: false,
        inputValidator: (value) => {
            if (!value) {
                return 'กรุณาใส่รหัสผ่าน!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            if (result.value === ADMIN_PASSWORD) {
                // รหัสผ่านถูกต้อง: อนุญาตให้เข้าถึงและแสดงตาราง
                Swal.fire({
                    icon: 'success',
                    title: 'เข้าสู่ระบบสำเร็จ!',
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                    // ลบหน้าจอ Login และแสดงเนื้อหาจริง
                    $("#orders-container").show();
                    // เรียกแสดงผลรายการสั่งซื้อ
                    renderOrders(simulatedOrders);
                });
            } else {
                // รหัสผ่านไม่ถูกต้อง: แจ้งเตือนและให้อีกครั้ง
                Swal.fire({
                    icon: 'error',
                    title: 'รหัสผ่านผิด!',
                    text: 'รหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง',
                    confirmButtonText: 'ลองใหม่'
                }).then(() => {
                    checkAdminAccess(); // เรียกตัวเองซ้ำเพื่อ Login ใหม่
                });
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // หากผู้ใช้กด Cancel
             // ซ่อนเนื้อหา Admin และแจ้งเตือน
            $("#orders-container").html("<p style='text-align:center;'>Access Denied. กรุณาใส่รหัสผ่านเพื่อเข้าสู่ระบบ</p>");
        }
    });
}

// เมื่อโหลดหน้าเว็บเสร็จสิ้น: ล็อกอินก่อน
$(document).ready(() => { 
    // ซ่อนเนื้อหา Admin ไว้ก่อน
    $("#orders-container").html("").hide(); 
    // เรียกฟังก์ชัน Login
    checkAdminAccess();
});