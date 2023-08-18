package chungbukUnivwebprojectteam.suggestionservice.dto.room;

import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.CreatedDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomCreateDto {

	@NotBlank
	@Size(min = 1, max = 100, message = "방 제목은 1 ~ 100자 이내이어야 합니다")
	private String spaceName;

	@NotNull
	@CreatedDate
	private LocalDateTime createdAt = LocalDateTime.now();

	@NotNull
	@CreatedDate
	private LocalDateTime lastedAt = LocalDateTime.now();
}
