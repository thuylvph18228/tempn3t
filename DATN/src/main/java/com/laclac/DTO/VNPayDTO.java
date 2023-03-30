package com.laclac.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class VNPayDTO {

    String vnp_Version = "2.1.0";

    String vnp_Command = "pay";

    String vnp_OrderInfo;

    String orderType;

    String vnp_TxnRef;

    String vnp_IpAddr;

    String vnp_TmnCode;

    String vnp_Amount;

    String vnp_CreateDate;

    String vnp_CurrCode;

    String vnp_Locale;

    String vnp_ReturnUrl;

    String vnp_SecureHash;

}
