// Generated with g9.

package com.laclac.entity;

import com.laclac.DTO.CurrentUser;
import com.laclac.DTO.FeedBackDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.io.Serializable;

@Entity()
@Table(name="feedbacks")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Feedback implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(nullable=false, length=255)
    private String feedback;

    @Column(nullable=false, precision=10)
    private Integer stars;

    public static Feedback toEntity(FeedBackDto feedBackDto) {
        return Feedback.builder()
                .id(feedBackDto.getId() == null ? null : feedBackDto.getId())
                .product(feedBackDto.getProduct())
                .user(CurrentUser.getCurrentUser().get())
                .feedback(feedBackDto.getFeedback())
                .stars(feedBackDto.getStars())
                .build();
    }

    public FeedBackDto toDto() {
        return FeedBackDto.builder()
                .id(this.id)
                .product(this.product)
                .user(this.user)
                .feedback(this.feedback)
                .stars(this.stars)
                .build();
    }

}
