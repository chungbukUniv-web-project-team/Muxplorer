package chungbukUnivwebprojectteam.suggestionservice.dto.room;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
@Setter
public class RoomListResponseDto {

	List<RoomResponseObjectDto> roomDtoList;
}
