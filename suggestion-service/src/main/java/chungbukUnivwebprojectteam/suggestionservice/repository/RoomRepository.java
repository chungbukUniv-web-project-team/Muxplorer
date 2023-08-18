package chungbukUnivwebprojectteam.suggestionservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import chungbukUnivwebprojectteam.suggestionservice.domain.RoomEntity;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, String> {

	List<RoomEntity> findAll();

	Optional<RoomEntity> findById(Long id);

	void deleteById(Long id);

	Optional<RoomEntity> findByUserId(Long userId);
}
