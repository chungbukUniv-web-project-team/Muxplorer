package chungbukUnivwebprojectteam.suggestionservice.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;

import chungbukUnivwebprojectteam.suggestionservice.domain.RoomEntity;
import chungbukUnivwebprojectteam.suggestionservice.domain.SuggestionEntity;
import chungbukUnivwebprojectteam.suggestionservice.dto.suggestion.SuggestionRequestDto;
import chungbukUnivwebprojectteam.suggestionservice.dto.suggestion.SuggestionResponseObjectDto;
import chungbukUnivwebprojectteam.suggestionservice.exception.NotFoundRoomByIdException;
import chungbukUnivwebprojectteam.suggestionservice.exception.NotFoundSuggestionToIdAndFromIdException;
import chungbukUnivwebprojectteam.suggestionservice.repository.RoomRepository;
import chungbukUnivwebprojectteam.suggestionservice.repository.SuggestionRepository;
import chungbukUnivwebprojectteam.suggestionservice.utils.IdConst;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
public class SuggestionServiceImpl implements SuggestionService {

	private final RoomRepository roomRepository;
	private final SuggestionRepository suggestionRepository;
	private final IdConst idConst;

	private void setId(SuggestionRequestDto suggestionRequestDto) {
		if (suggestionRequestDto.getToId() == null && suggestionRequestDto.getFromId() == null) {
			throw new NotFoundSuggestionToIdAndFromIdException("ToId와 FromId가 존재하지 않습니다");
		} else if (suggestionRequestDto.getToId() == null) {
			suggestionRequestDto.setToId(idConst.MANAGER_ID);
		} else if (suggestionRequestDto.getFromId() == null) {
			suggestionRequestDto.setFromId(idConst.MANAGER_ID);
		}
	}

	@Override
	@Transactional
	public void saveSuggestion(Long roomId, SuggestionRequestDto suggestionRequestDto) {
		RoomEntity roomEntity = roomRepository.findById(roomId).orElse(null);

		if (roomEntity == null) {
			throw new NotFoundRoomByIdException("아이디를 통해 룸을 찾을 수 없습니다");
		}

		log.info("11111111");
		setId(suggestionRequestDto);
		log.info("22222");
		SuggestionEntity suggestionEntity = SuggestionEntity.builder()
			.toId(suggestionRequestDto.getToId())
			.fromId(suggestionRequestDto.getFromId())
			.message(suggestionRequestDto.getMessage())
			.room(roomEntity)
			.createdAt(LocalDateTime.now())
			.build();

		roomEntity.updateLastedAt(LocalDateTime.now());
		suggestionRepository.save(suggestionEntity);
	}

	@Override
	public List<SuggestionResponseObjectDto> findAllByRoom(Long roomId) {
		RoomEntity room = roomRepository.findById(roomId).orElse(null);
		if (room == null) {
			throw new NotFoundRoomByIdException("룸을 찾을 수 없습니다");
		}
		List<SuggestionEntity> suggestions = room.getSuggestions();
		return suggestions.stream()
			.map(suggestionEntity -> new SuggestionResponseObjectDto(suggestionEntity.getToId(),
				suggestionEntity.getFromId(), suggestionEntity.getMessage(), suggestionEntity.getCreatedAt()))
			.collect(Collectors.toList());
	}

}
