package chungbukUnivwebprojectteam.suggestionservice.domain;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "proposal")
@Getter
@NoArgsConstructor
public class ProposalEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "user_id")
	private Long userId;

	@Column(length = 100)
	private String title;

	@Column(length = 3000)
	private String content;

	@CreatedDate
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@Builder
	public ProposalEntity(Long userId, String title, String content,LocalDateTime createdAt) {
		this.userId = userId;
		this.title = title;
		this.content = content;
		this.createdAt = createdAt;
	}
}
