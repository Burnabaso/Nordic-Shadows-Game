function collectKey(player, keySprite, collider) {
    // Disable key sprite and destroy the collider
    keySprite.disableBody(true, true); // Hide and disable the key
    this.physics.world.removeCollider(collider); // Remove the collider
}