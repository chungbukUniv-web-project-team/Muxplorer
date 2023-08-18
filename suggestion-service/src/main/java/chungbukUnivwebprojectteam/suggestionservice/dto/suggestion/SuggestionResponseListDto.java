package chungbukUnivwebprojectteam.suggestionservice.dto.suggestion;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SuggestionResponseListDto {

	List<SuggestionResponseObjectDto> suggestionResponseObjectDtoList;
}
