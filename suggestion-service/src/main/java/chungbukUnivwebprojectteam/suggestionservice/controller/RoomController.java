package chungbukUnivwebprojectteam.suggestionservice.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import chungbukUnivwebprojectteam.suggestionservice.dto.room.RoomCreateDto;
import chungbukUnivwebprojectteam.suggestionservice.dto.room.RoomDto;
import chungbukUnivwebprojectteam.suggestionservice.dto.room.RoomResponseObjectDto;
import chungbukUnivwebprojectteam.suggestionservice.service.RoomService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RoomController {

	private final RoomService roomService;

	@PostMapping("/create/room/{id}")
	public ResponseEntity<?> createRoom(@PathVariable Long id, @RequestBody @Validated RoomCreateDto roomCreateDto) {
		roomService.createRoom(id, roomCreateDto);
		return ResponseEntity.status(HttpStatus.CREATED).body("SUCCESS");
	}

	@GetMapping("/find/room")
	public ResponseEntity<?> findAllRoom() {
		List<RoomResponseObjectDto> allRoom = roomService.findAllRoom();
		return ResponseEntity.status(HttpStatus.OK).body(allRoom);
	}

	@GetMapping("/find/room/{userId}")
	public ResponseEntity<?> findRoom(@PathVariable Long userId) {
		RoomResponseObjectDto roomResponseObjectDto = roomService.findRoomByUserId(userId);
		return ResponseEntity.status(HttpStatus.OK).body(roomResponseObjectDto);
	}

	@GetMapping("/find/room/pk/{id}")
	public ResponseEntity<?> findRoomPk(@PathVariable Long id) {
		RoomDto roomResponseDto = roomService.findRoomById(id);
		return ResponseEntity.status(HttpStatus.OK).body(roomResponseDto);
	}

	@DeleteMapping("/delete/room/{id}")
	public ResponseEntity<?> deleteRoom(@PathVariable Long id) {
		roomService.deleteRoom(id);
		return ResponseEntity.status(HttpStatus.OK).body("SUCCESS");
	}
}
