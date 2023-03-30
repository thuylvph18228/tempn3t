package com.laclac.DTO;

import com.laclac.entity.Product;
import com.laclac.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@SuperBuilder
public class FeedBackDto {

    private Integer id;

    private Product product;

    private User user;

    private String feedback;

    private Integer stars;

}
