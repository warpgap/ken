
function check_all_collisions() {
    move();
    var any_collsion;
    for (step1 = 0; step1 < allRects.length; step1++) {
        for (step2 = step1 + 1; step2 < allRects.length; step2++) {
            any_collision = check_pair_collision(allRects[step1], allRects[step2])
            if (any_collision) {

                location.reload();

            }
        }
    }
}