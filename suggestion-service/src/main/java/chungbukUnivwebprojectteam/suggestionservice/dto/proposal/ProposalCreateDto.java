package chungbukUnivwebprojectteam.suggestionservice.dto.proposal;

import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProposalCreateDto {

	@NotNull
	private Long userId;


	@NotBlank
	@Size(min = 1, max = 100, message = "제목의 길이는 1 ~ 100 자 이내이어야 합니다")
	private String title;

	@NotBlank
	@Size(min = 1, max = 100, message = "본문의 길이는 1 ~ 3000자 이내이어야 합니다")
	private String content;

	@NotNull
	private LocalDateTime createdAt = LocalDateTime.now();
}
