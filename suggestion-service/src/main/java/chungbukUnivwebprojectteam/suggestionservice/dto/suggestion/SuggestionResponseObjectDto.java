package chungbukUnivwebprojectteam.suggestionservice.dto.suggestion;

import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SuggestionResponseObjectDto {

	@NotNull
	private Long toId;
	@NotNull
	private Long fromId;
	@NotBlank
	@Size(min = 1, max = 300, message = "메시지는 1 ~ 300자 이내이어야 합니다")
	private String message;
	@NotNull
	private LocalDateTime createdAt;
}
