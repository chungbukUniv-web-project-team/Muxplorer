package chungbukUnivwebprojectteam.suggestionservice.domain;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "room")
@Getter
@NoArgsConstructor
public class RoomEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "user_id")
	private Long userId;

	@Column(name = "manager_id")
	private Long managerId;

	@Column(name = "space_name", length = 100)
	private String spaceName;

	@CreatedDate
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@LastModifiedDate
	@Column(name = "lasted_at")
	private LocalDateTime lastedAt;

	@OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<SuggestionEntity> suggestions;

	@Builder
	public RoomEntity(Long userId, Long managerId, String spaceName, LocalDateTime createdAt,
		LocalDateTime lastedAt) {
		this.id = id;
		this.userId = userId;
		this.managerId = managerId;
		this.spaceName = spaceName;
		this.createdAt = createdAt;
		this.lastedAt = lastedAt;
	}

	public void updateLastedAt(LocalDateTime lastedAt) {
		this.lastedAt = lastedAt;
	}
}
