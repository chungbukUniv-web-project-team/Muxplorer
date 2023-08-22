package chungbukUnivwebprojectteam.suggestionservice.dto.suggestion;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SuggestionRequestDto {

	private Long toId;
	private Long fromId;
	@NotBlank
	@Size(min = 1, max = 300, message = "메시지는 1 ~ 300자 이내이어야 합니다")
	private String message;
}
