package chungbukUnivwebprojectteam.suggestionservice.dto.room;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RoomDto {

	@NotNull
	private Long id;
	@NotNull
	private Long userId;
	@NotNull
	private Long managerId;
	@NotBlank
	@Size(min = 1, max = 100, message = "제목의 크기는 1 ~ 100자 이어야 합니다.")
	private String spaceName;
}
