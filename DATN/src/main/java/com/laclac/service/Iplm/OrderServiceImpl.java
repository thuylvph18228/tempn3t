package com.laclac.service.Iplm;

import com.laclac.DTO.*;
import com.laclac.config.vnpay.Config;
import com.laclac.entity.*;
import com.laclac.repository.OrderDetailRepository;
import com.laclac.repository.OrderRepository;
import com.laclac.repository.ProductDetailRepository;
import com.laclac.service.MailService;
import com.laclac.service.OrderHistoryService;
import com.laclac.service.OrderService;
import com.laclac.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private OrderDetailRepository orderDetailRepo;

    @Autowired
    private ProductDetailRepository productDetailRepo;

    @Autowired
    private OrderHistoryService orderHistoryService;

    @Autowired
    private VoucherService voucherService;

    @Autowired
    private MailService mailService;

    private OrderDto orderDtoNew;

    @Override
    @Transactional
    public Page<Order> getAll(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Order> orders = this.orderRepo.findAll(pageable);
        return orders;
    }

    @Override
    @Transactional
    public List<Order> getAllByCreatedDate(String date) {
        return null;
    }

    @Override
    @Transactional
    public List<OrderDto> getAllByUserName(String username) {
        OrderType orderType = OrderType.ONLINE_WEB;
        List<Order> list = this.orderRepo.findAllByUserName(username, orderType);
        List<OrderDto> listDto = list.stream().map(Order :: toDto).collect(Collectors.toList());
        return listDto;
    }

    @Override
    @Transactional
    public List<OrderDto> getAllOrderReturn(String status) {
        return this.orderRepo.getAllOrderReturn(status).stream().map(Order :: toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Page<Order> getAllByStatus(Integer page, Integer size, String status) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Order> orders = this.orderRepo.findAllByStatusOrderByCreatedDateDesc(OrderStatus.valueOf(status), pageable);
        return orders;
    }

    @Override
    @Transactional
    public Order getById(int OrderId) {
        return null;
    }

    @Override
    public List<OrderDto> finAllBy(String orderCode) {
        return this.orderRepo.findAllBy(orderCode).stream().map(Order :: toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OrderDto save(OrderDto orderDto) throws MessagingException {
        if(orderDto.getId() == null) {
            if(orderDto.getOrderType().equalsIgnoreCase("OFFLINE")){
                orderDto.setStatus(OrderStatus.DELIVERED.toString());
            } else if(orderDto.getOrderType().equalsIgnoreCase("ONLINE")) {
                orderDto.setStatus(OrderStatus.CONFIRMED.toString());
            }  else if(orderDto.getOrderType().equalsIgnoreCase("ONLINE_WEB")){
                orderDto.setStatus(OrderStatus.WAIT_FOR_CONFIRMATION.toString());
            }
        }
        if(orderDto.getStatus().equalsIgnoreCase("DELIVERED")){
            orderDto.setIsPay(1);
        }
        Order order = this.orderRepo.saveAndFlush(Order.toEntity(orderDto));

        List<OrderDetail> orderDetails = orderDto.getOrderDetails().stream().map(orderDetailDto -> {
            // cập nhật số lượng sản phẩm trong kho khi mà admin xác nhận hoặc mua tại cửa hàng
            if(orderDto.getOrderType().equalsIgnoreCase("OFFLINE") || orderDto.getStatus().equalsIgnoreCase("CONFIRMED")) {
                ProductDetail productDetail = this.productDetailRepo.findById(orderDetailDto.getProductDetail().getId()).get();
                productDetail.setQuantity(productDetail.getQuantity() - orderDetailDto.getQuantity());
                this.productDetailRepo.save(productDetail);
            }

            orderDetailDto.setOrderId(order.getId());
            return OrderDetail.toEntity(orderDetailDto);
        }).collect(Collectors.toList());

        List<OrderDetail> orderDetailList = new ArrayList<>();
        for (OrderDetail orderDetail : orderDetails) {
            OrderDetail o = this.orderDetailRepo.save(orderDetail);
            orderDetailList.add(o);
        }

        OrderDto orderDto1 = order.toDto();
        if(orderDto.getId() != null){
            List<OrderDetailDto> orderDetailListDto = orderDetailList.stream().map(OrderDetail::toDto).collect(Collectors.toList());
            orderDto1.setOrderDetails(orderDetailListDto);
        }

        //cập nhật số lượng voucher khi khách hàng sử dụng
        if(orderDto.getVoucher() != null) {
            Voucher voucher = orderDto.getVoucher();
            voucher.setQuantity(orderDto.getVoucher().getQuantity() - 1);
            this.voucherService.save(orderDto.getVoucher().toDto());
        }

        // gửi mail khi khách hàng đặt hàng trên website
        if(orderDto.getOrderType().equalsIgnoreCase("ONLINE_WEB")){
            orderDto.setCode(orderDto.getCode());
            Optional<User> user = CurrentUser.getCurrentUser();
            if(user.isPresent()){
                if(user.get().getEmail() != null ){
                    MailDto mailDto = MailDto.builder().to(user.get().getEmail()).subject("Thông tin đơn hàng").build();
                    this.mailService.pushMailToQueue(mailDto, orderDto);
                }
            }

        }

        return orderDto1;
    }

    @Override
    @Transactional
    public OrderDto updateStatus(OrderDto orderDto) {
        return this.orderRepo.saveAndFlush(Order.toEntity(orderDto)).toDto();
    }

    @Override
    @Transactional
    public OrderDto returnOrder(OrderDto orderDto) {
        List<OrderDetail> orderDetails = orderDto.getOrderDetails().stream().map(orderDetailDto -> {
            orderDetailDto.setOrderId(orderDto.getId());
            return OrderDetail.toEntity(orderDetailDto);
        }).collect(Collectors.toList());

        // cập nhật số lượng sản phẩm trong kho:
        for (OrderHistoryDto orderHistoryDto : orderDto.getOrderHistories()) {
            if(orderHistoryDto.getStatus().equalsIgnoreCase("DONE") && !orderHistoryDto.getAction().equalsIgnoreCase("DOI")) {
                Integer idProductDetail = orderHistoryDto.getOrderDetail().getProductDetail().getId();
                ProductDetail productDetail = this.productDetailRepo.findById(idProductDetail).get();
                productDetail.setQuantity(productDetail.getQuantity() + orderHistoryDto.getQuantity());
                this.productDetailRepo.save(productDetail);
            }
        }

        // cập nhật lại order detail nếu trạng thái là được xác nhận(DONE)
        if(orderDto.getOrderHistories().get(0).getStatus().equalsIgnoreCase("DONE")) {
            List<OrderDetail> orderDetailList = new ArrayList<>();

            for (OrderDetailDto orderDetailDto : orderDto.getOrderDetails()) {
                OrderDetail orderDetail1 = this.orderDetailRepo.save(OrderDetail.toEntity(orderDetailDto));
                orderDetailList.add(orderDetail1);
            }

            //List<OrderDetail> orderDetailList = this.orderDetailRepo.saveAll(orderDetails);
            List<OrderDetailDto> orderDetailListDto = orderDetailList.stream().map(OrderDetail::toDto).collect(Collectors.toList());
            orderDto.setOrderDetails(orderDetailListDto);

            // xóa các orderDetail khi khách hàng trả tất cả hàng của sản phẩm đó
            for (OrderHistoryDto item : orderDto.getOrderHistories()) {
                if(item.getAction().equalsIgnoreCase("TRA_ALL")) {
                    item.getOrderDetail().setStatus(0);
//                    this.orderDetailRepo.deleteById(item.getOrderDetail().getId());
                    this.orderDetailRepo.save(OrderDetail.toEntity(item.getOrderDetail()));
                }
            }

            for (OrderDetailDto orderDetailDto : orderDto.getOrderDetails()) {
                if(orderDetailDto.getQuantity() < 1){
                    orderDetailDto.setStatus(0);
//                    this.orderDetailRepo.deleteById(orderDetailDto.getId());
                    this.orderDetailRepo.save(OrderDetail.toEntity(orderDetailDto));
                }

            }
        }

        // cập nhật lịch sử thay đổi vào orderHistory
        List<OrderHistoryDto> orderHistories = orderDto.getOrderHistories();
        List<OrderHistoryDto> newOrderHistories = this.orderHistoryService.saveAll(orderHistories);

        orderDto.setOrderHistories(newOrderHistories);
        return orderDto;
    }

    // xóa order history khi không được xác nhận
    @Override
    public void cancelReturnOrder(OrderDto orderDto) {
        for (OrderHistoryDto orderHistoryDto : orderDto.getOrderHistories()) {
            if(orderHistoryDto.getStatus().equalsIgnoreCase("CANCEL")) {
                this.orderHistoryService.delete(orderHistoryDto.getId());
            }
        }
    }

    @Override
    @Transactional
    public void delete(OrderDto orderDto) {
        if( orderDto.getOrderDetails() != null && orderDto.getOrderDetails().size() > 0){
            for (OrderDetailDto orderDetailDto: orderDto.getOrderDetails()) {
                this.orderDetailRepo.deleteById(orderDetailDto.getId());
            }
        }
        if(orderDto.getOrderHistories() != null && orderDto.getOrderHistories().size() > 0){
            for (OrderHistoryDto orderDetaHistoryDto: orderDto.getOrderHistories()) {
                this.orderDetailRepo.deleteById(orderDetaHistoryDto.getId());
            }
        }
        this.orderRepo.deleteById(orderDto.getId());
    }

    @Override
    public List<Object> countOrder(String year) {
        return this.orderRepo.countOrder(year);
    }

    @Override
    public List<Object> countInDay(String month, String year) {
        return this.orderRepo.countInDay(month, year);
    }

    @Override
    public List<Object> turnover(String year) {
        return this.orderRepo.turnover(year);
    }

    @Override
    public List<OrderDto> findByTime(String begin, String end) {
        return this.orderRepo.findByTime(begin, end).stream().map(Order::toDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getBytotalMoney(String beginMoney, String endMoney) {
        return this.orderRepo.getOrderByTotalMoney(beginMoney, endMoney).stream().map(Order :: toDto).collect(Collectors.toList());
    }

    @Override
    public String pay(OrderDto orderDto) throws UnsupportedEncodingException {

        this.orderDtoNew = orderDto;

        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_OrderInfo = "Thanh toan don hang";
//        String vnp_OrderInfo = vnPayDTO.getVnp_OrderInfo();
//        String orderType = vnPayDTO.getOrderType();
        String orderType = "200000";
        String vnp_TxnRef = Config.getRandomNumber(8);
        String vnp_IpAddr = "192.168.16.51";
        String vnp_TmnCode = Config.vnp_TmnCode;

//        int amount = Integer.parseInt(vnPayDTO.getVnp_Amount()) * 100;
        int amount = orderDto.getTotalMoney() * 100;
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        String bank_code = null;
        if (bank_code != null && !bank_code.isEmpty()) {
            vnp_Params.put("vnp_BankCode", bank_code);
        }
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.put("vnp_OrderType", orderType);

        String locate = null;
        if (locate != null && !locate.isEmpty()) {
            vnp_Params.put("vnp_Locale", locate);
        } else {
            vnp_Params.put("vnp_Locale", "vn");
        }
        vnp_Params.put("vnp_ReturnUrl", Config.vnp_Returnurl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));

        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());

        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        //Add Params of 2.0.1 Version
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
        //Billing
//        vnp_Params.put("vnp_Bill_Mobile", req.getParameter("txt_billing_mobile"));
//        vnp_Params.put("vnp_Bill_Email", req.getParameter("txt_billing_email"));
//        String fullName = (req.getParameter("txt_billing_fullname")).trim();
//        if (fullName != null && !fullName.isEmpty()) {
//            int idx = fullName.indexOf(' ');
//            String firstName = fullName.substring(0, idx);
//            String lastName = fullName.substring(fullName.lastIndexOf(' ') + 1);
//            vnp_Params.put("vnp_Bill_FirstName", firstName);
//            vnp_Params.put("vnp_Bill_LastName", lastName);
//
//        }
//        vnp_Params.put("vnp_Bill_Address", req.getParameter("txt_inv_addr1"));
//        vnp_Params.put("vnp_Bill_City", req.getParameter("txt_bill_city"));
//        vnp_Params.put("vnp_Bill_Country", req.getParameter("txt_bill_country"));
//        if (req.getParameter("txt_bill_state") != null && !req.getParameter("txt_bill_state").isEmpty()) {
//            vnp_Params.put("vnp_Bill_State", req.getParameter("txt_bill_state"));
//        }
        // Invoice
//        vnp_Params.put("vnp_Inv_Phone", req.getParameter("txt_inv_mobile"));
//        vnp_Params.put("vnp_Inv_Email", req.getParameter("txt_inv_email"));
//        vnp_Params.put("vnp_Inv_Customer", req.getParameter("txt_inv_customer"));
//        vnp_Params.put("vnp_Inv_Address", req.getParameter("txt_inv_addr1"));
//        vnp_Params.put("vnp_Inv_Company", req.getParameter("txt_inv_company"));
//        vnp_Params.put("vnp_Inv_Taxcode", req.getParameter("txt_inv_taxcode"));
//        vnp_Params.put("vnp_Inv_Type", req.getParameter("cbo_inv_type"));
        //Build data to hash and querystring
        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = Config.hmacSHA512(Config.vnp_HashSecret, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = Config.vnp_PayUrl + "?" + queryUrl;
        return paymentUrl;

    }

    @Override
    public OrderDto updatePay() throws MessagingException {
        this.orderDtoNew.setIsPay(1);
        OrderDto orderDto = this.save(this.orderDtoNew);
        if(orderDto != null){
            orderDto.setOrderDetails(orderDtoNew.getOrderDetails());
            this.orderDtoNew = null;
            return orderDto;
        } else {
            return null;
        }
    }
}
