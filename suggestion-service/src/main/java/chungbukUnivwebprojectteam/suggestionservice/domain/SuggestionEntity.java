package chungbukUnivwebprojectteam.suggestionservice.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "suggestion")
@NoArgsConstructor
public class SuggestionEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "to_id")
	private Long toId;

	@Column(name = "from_id")
	private Long fromId;

	@Column(name = "message")
	private String message;

	@Column(name = "created_at")
	@CreatedDate
	private LocalDateTime createdAt;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "room_id")
	private RoomEntity room;

	@Builder
	public SuggestionEntity(Long toId, Long fromId, String message, LocalDateTime createdAt, RoomEntity room) {
		this.toId = toId;
		this.fromId = fromId;
		this.message = message;
		this.createdAt = createdAt;
		this.room = room;
	}
}
