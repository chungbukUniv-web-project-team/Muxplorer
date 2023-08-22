package chungbukUnivwebprojectteam.suggestionservice.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import chungbukUnivwebprojectteam.suggestionservice.dto.suggestion.SuggestionRequestDto;
import chungbukUnivwebprojectteam.suggestionservice.dto.suggestion.SuggestionResponseObjectDto;
import chungbukUnivwebprojectteam.suggestionservice.service.SuggestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api")
@RequiredArgsConstructor
public class SuggestionController {

	private final SuggestionService suggestionService;

	@PostMapping("/send/suggestion/{id}")
	public ResponseEntity<?> sendSuggestion(@PathVariable Long id,
		@RequestBody @Validated SuggestionRequestDto suggestionRequestDto) {
		suggestionService.saveSuggestion(id, suggestionRequestDto);
		return ResponseEntity.status(HttpStatus.CREATED).body("SUCCESS");
	}

	@GetMapping("/find/suggestion/{id}")
	public ResponseEntity<?> findSuggestion(@PathVariable Long id) {
		List<SuggestionResponseObjectDto> allMessages = suggestionService.findAllByRoom(id);
		return ResponseEntity.status(HttpStatus.OK).body(allMessages);
	}
}
