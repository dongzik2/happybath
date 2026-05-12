document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer 설정: 화면에 요소가 보이면 애니메이션 실행
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // 요소가 20% 보일 때 트리거
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 화면에 보이면 visible 클래스 추가하여 페이드인 효과
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // .fade-in 클래스를 가진 모든 요소 관찰 시작
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // --- 캐릭터 탭 상호작용 로직 ---
    const characterCards = document.querySelectorAll('.person.card[data-target]');
    const tabContents = document.querySelectorAll('.char-tab-content');
    const tabsContainer = document.getElementById('character-tabs');

    characterCards.forEach(card => {
        card.addEventListener('click', () => {
            // 1. 모든 카드의 active 상태 제거
            characterCards.forEach(c => c.classList.remove('active'));
            // 2. 클릭된 카드에 active 상태 추가
            card.classList.add('active');

            // 3. 대상 탭 ID 가져오기
            const targetId = card.getAttribute('data-target');
            
            // 4. 모든 탭 컨텐츠 숨기기
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // 5. 대상 탭 보여주기
            const targetTab = document.getElementById(`tab-${targetId}`);
            if (targetTab) {
                targetTab.classList.add('active');
            }

            // 6. 탭 컨테이너로 부드럽게 스크롤
            if (tabsContainer) {
                const yOffset = -100; // 상단 여백
                const y = tabsContainer.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        });
    });

    // --- 패럴랙스 텍스트 박스 토글 로직 (클릭 시 배경 이미지 보기) ---
    const parallaxContents = document.querySelectorAll('.parallax-content');
    parallaxContents.forEach(content => {
        content.addEventListener('click', () => {
            content.classList.toggle('hide-text');
        });
    });
});
