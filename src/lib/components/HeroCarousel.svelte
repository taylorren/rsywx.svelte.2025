<script lang="ts">
	import {
		Carousel,
		CarouselContent,
		CarouselItem,
		CarouselNext,
		CarouselPrevious
	} from '$lib/components/ui/carousel';
	import { onMount } from 'svelte';

	let carouselApi = $state<any>(null);

	onMount(() => {
		// Auto-scroll every 4 seconds
		const interval = setInterval(() => {
			if (carouselApi) {
				carouselApi.scrollNext();
			}
		}, 4000);

		return () => clearInterval(interval);
	});
</script>

<div class="mb-12">
	<Carousel 
		class="w-full max-w-6xl mx-auto"
		opts={{
			align: "start",
			loop: true
		}}
		setApi={(api) => carouselApi = api}
	>
		<CarouselContent>
			<CarouselItem>
				<div class="relative aspect-21/9 w-full overflow-hidden rounded-lg">
					<img
						src="/images/hannibal.webp"
						alt="Hannibal"
						class="h-full w-full object-cover transition-transform hover:scale-105"
					/>
					<div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
					<div class="absolute bottom-0 left-0 right-0 p-6 text-white">
						<h3 class="text-3xl font-bold mb-2">First principles, Clarice. Simplicity.</h3>
						<p class="text-sm opacity-90">Dr. Hannibal Lecter</p>
					</div>
				</div>
			</CarouselItem>
			<CarouselItem>
				<div class="relative aspect-21/9 w-full overflow-hidden rounded-lg">
					<img
						src="/images/hilbert.webp"
						alt="Hilbert"
						class="h-full w-full object-cover transition-transform hover:scale-105"
					/>
					<div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
					<div class="absolute bottom-0 left-0 right-0 p-6 text-white">
						<h3 class="text-3xl font-bold mb-2">Wir müssen wissen.<br>Wir werden wissen.</h3>
						<p class="text-sm opacity-90">David Hilbert</p>
					</div>
				</div>
			</CarouselItem>
			<CarouselItem>
				<div class="relative aspect-21/9 w-full overflow-hidden rounded-lg">
					<img
						src="/images/keynes.webp"
						alt="Keynes"
						class="h-full w-full object-cover transition-transform hover:scale-105"
					/>
					<div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
					<div class="absolute bottom-0 left-0 right-0 p-6 text-white">
						<h3 class="text-3xl font-bold mb-2">...the sound principle is to take the most generous course.</h3>
						<p class="text-sm opacity-90">John Maynard Keynes</p>
					</div>
				</div>
			</CarouselItem>
		</CarouselContent>
		<CarouselPrevious />
		<CarouselNext />
	</Carousel>
</div>