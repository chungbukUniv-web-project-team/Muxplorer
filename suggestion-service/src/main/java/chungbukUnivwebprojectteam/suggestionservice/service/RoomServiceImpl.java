package chungbukUnivwebprojectteam.suggestionservice.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;

import chungbukUnivwebprojectteam.suggestionservice.domain.RoomEntity;
import chungbukUnivwebprojectteam.suggestionservice.dto.room.RoomCreateDto;
import chungbukUnivwebprojectteam.suggestionservice.dto.room.RoomDto;
import chungbukUnivwebprojectteam.suggestionservice.dto.room.RoomResponseObjectDto;
import chungbukUnivwebprojectteam.suggestionservice.exception.NotFoundRoomByIdException;
import chungbukUnivwebprojectteam.suggestionservice.exception.NotFoundRoomByUserIdException;
import chungbukUnivwebprojectteam.suggestionservice.repository.RoomRepository;
import chungbukUnivwebprojectteam.suggestionservice.utils.IdConst;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

	private final RoomRepository roomRepository;
	private final IdConst idConst;

	@Override
	public void createRoom(Long userId, RoomCreateDto roomCreateDto) {
		RoomEntity roomEntity = RoomEntity.builder()
			.userId(userId)
			.managerId(idConst.MANAGER_ID)
			.createdAt(roomCreateDto.getCreatedAt())
			.lastedAt(roomCreateDto.getLastedAt())
			.spaceName(roomCreateDto.getSpaceName())
			.build();

		roomRepository.save(roomEntity);
	}

	@Override
	public List<RoomResponseObjectDto> findAllRoom() {
		List<RoomEntity> roomEntities = roomRepository.findAll();
		return roomEntities.stream()
			.map(roomEntity -> new RoomResponseObjectDto(roomEntity.getId(), roomEntity.getSpaceName(),
				roomEntity.getLastedAt()))
			.collect(Collectors.toList());
	}

	@Override
	public RoomResponseObjectDto findRoomByUserId(Long userId) {
		RoomEntity roomEntity = roomRepository.findByUserId(userId).orElse(null);
		if (roomEntity == null) {
			throw new NotFoundRoomByUserIdException("유저 아이디에 해당하는 방을 찾을 수 없습니다");
		}
		return new RoomResponseObjectDto(roomEntity.getId(),
			roomEntity.getSpaceName(), roomEntity.getLastedAt());
	}

	@Override
	public RoomDto findRoomById(Long id) {
		RoomEntity roomEntity = roomRepository.findById(id).orElse(null);
		if (roomEntity == null) {
			throw new NotFoundRoomByIdException("아이디에 해당하는 방을 찾을 수 없습니다");
		}
		return new RoomDto(roomEntity.getId(), roomEntity.getUserId(), roomEntity.getManagerId(),
			roomEntity.getSpaceName());
	}

	@Transactional
	@Override
	public void deleteRoom(Long id) {
		roomRepository.deleteById(id);
	}
}
