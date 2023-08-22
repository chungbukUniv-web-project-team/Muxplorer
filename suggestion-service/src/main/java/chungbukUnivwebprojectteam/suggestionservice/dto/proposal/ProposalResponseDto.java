package chungbukUnivwebprojectteam.suggestionservice.dto.proposal;

import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProposalResponseDto {

	@NotNull
	private Long id;

	@NotBlank
	@Size(min = 1, max = 100, message = "제목은 1 ~ 100자 이내이어야 합니다.")
	private String title;

	@NotBlank
	@Size(min = 1, max = 3000, message = "건의사항은 1 ~ 3000자 이내이어야 합니다.")
	private String content;

	@NotNull
	private LocalDateTime createdAt;

}
