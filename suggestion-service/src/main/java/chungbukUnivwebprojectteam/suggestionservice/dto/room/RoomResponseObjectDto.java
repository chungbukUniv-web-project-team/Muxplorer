package chungbukUnivwebprojectteam.suggestionservice.dto.room;

import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RoomResponseObjectDto {

	@NotNull
	private Long id;

	@NotBlank
	@Size(min = 1,max = 100,message = "방의 제목은 1 ~ 100자 사이어야 합니다.")
	private String spaceName;

	@NotNull
	private LocalDateTime lastedAt;
}
