package chungbukUnivwebprojectteam.suggestionservice.service;

import java.util.List;

import chungbukUnivwebprojectteam.suggestionservice.dto.room.RoomCreateDto;
import chungbukUnivwebprojectteam.suggestionservice.dto.room.RoomDto;
import chungbukUnivwebprojectteam.suggestionservice.dto.room.RoomResponseObjectDto;

public interface RoomService {

	void createRoom(Long userId, RoomCreateDto roomCreateDto);

	List<RoomResponseObjectDto> findAllRoom();

	RoomResponseObjectDto findRoomByUserId(Long userId);

	RoomDto findRoomById(Long id);

	void deleteRoom(Long id);
}
